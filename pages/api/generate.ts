import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

export const config = {
  api: {
    bodyParser: false,
  },
}

function parseForm(req: NextApiRequest): Promise<{fields:any, files:any}> {
  const form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.multiples = false
  return new Promise((resolve, reject)=>{
    form.parse(req as any, (err, fields, files)=>{
      if(err) reject(err)
      else resolve({fields, files})
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).send('Method not allowed')
  try{
    const { files } = await parseForm(req)
    const file = files.file
    if(!file) return res.status(400).send('No file uploaded')

    // formidable may give different shapes depending on runtime
    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath
    const content = fs.readFileSync(filePath, 'utf-8')

    const parsed = Papa.parse(content, { header: true, skipEmptyLines: true })
    const rows = parsed.data as any[]

    // Preview first 5 rows
    const preview = rows.slice(0,5)

    // If REPORT_GENERATOR_URL is configured, forward each row or batch to the report-generator service
    const generatorUrl = process.env.REPORT_GENERATOR_URL // e.g. https://report-generator.example.com
    const generated: any[] = []
    if(generatorUrl){
      for(const row of rows){
        // Map CSV row fields to payload expected by generator
        const payload = mapRowToPayload(row)
        try{
          const r = await fetch(generatorUrl + '/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if(r.ok){
            // if the generator returns JSON with s3 url, parse it; otherwise skip
            const ct = r.headers.get('content-type') || ''
            if(ct.includes('application/json')){
              const body = await r.json()
              if(body.url) generated.push({url: body.url})
            } else {
              // for binary PDF response, we can upload it to S3 here — left as future step
            }
          }
        }catch(err){
          console.error('generator call failed', err)
        }
      }
    }

    // cleanup temp file
    try{ fs.unlinkSync(filePath) }catch(_){}

    return res.status(200).json({ preview, count: rows.length, generated })
  }catch(err:any){
    console.error(err)
    return res.status(500).send(String(err.message || err))
  }
}

function mapRowToPayload(row:any){
  // Basic mapping: try to guess common column names. Adjust later per your sheets.
  return {
    report_no: row.report_no || row.ReportNo || row['Report No'] || '',
    client: row.client || row.Client || row['Client'] || '',
    date: row.date || row.Date || '',
    items: extractItemsFromRow(row)
  }
}

function extractItemsFromRow(row:any){
  // If your CSV contains repeating columns for items (e.g. item1_name,item1_result,item2_name...), implement mapping here.
  // For now, try to detect columns like 'item_name' and 'item_result' pairs or a single 'result' column.
  const items: any[] = []
  if(row.item_name && row.result){
    items.push({ name: row.item_name, method: row.method || '', unit: row.unit || '', result: row.result })
  } else {
    // fallback: take any columns that look like test results
    for(const k of Object.keys(row)){
      if(k.toLowerCase().includes('alcohol') || k.toLowerCase().includes('result') || k.toLowerCase().includes('value')){
        items.push({ name: k, method: '', unit: '', result: row[k] })
      }
    }
  }
  return items
}
