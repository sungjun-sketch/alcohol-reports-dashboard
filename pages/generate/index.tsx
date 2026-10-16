import { useState } from 'react'

export default function GeneratePage(){
  const [fileName, setFileName] = useState('')
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<any>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]
    if(!f) return
    setFileName(f.name)
    setStatus('Uploading...')

    const fd = new FormData()
    fd.append('file', f)

    try{
      const res = await fetch('/api/generate', { method: 'POST', body: fd })
      if(!res.ok){
        const text = await res.text()
        setStatus('Error: ' + text)
        return
      }

      const data = await res.json()
      setResult(data)
      setStatus('Parsed CSV — preview below')
    }catch(err:any){
      setStatus('Upload failed: ' + String(err))
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Generate Reports</h1>

      <p className="mb-4">You can upload a CSV file containing targets to generate reports. The server will parse the CSV and (if a report-generator service is configured) call it to produce PDFs and upload to S3.</p>

      <div className="mb-4">
        <input type="file" accept="text/csv" onChange={handleUpload} />
      </div>

      <div className="mb-4 text-sm text-gray-600">{status}</div>

      {result && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-2">CSV Preview (first 5 rows)</h2>
          <pre className="text-xs max-h-64 overflow-auto">{JSON.stringify(result.preview, null, 2)}</pre>
          {result.generated && (
            <div className="mt-3">
              <h3 className="font-medium">Generated PDFs</h3>
              <ul className="list-disc pl-6">
                {result.generated.map((g:any, idx:number)=> (
                  <li key={idx}><a href={g.url} target="_blank" rel="noreferrer" className="text-blue-600">{g.url}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
