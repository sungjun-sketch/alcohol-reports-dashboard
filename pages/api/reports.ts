// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const reports = [
    { id: '1', reportNo: 'RPT-2026-001', client: 'Client A', status: 'Approved', date: '2026-10-15' },
    { id: '2', reportNo: 'RPT-2026-002', client: 'Client B', status: 'Draft', date: '2026-10-14' }
  ]
  res.status(200).json(reports)
}
