# CSV workflow

This project supports uploading a CSV of targets/rows from the Generate page. The server parses the CSV and (optionally) calls an external report-generator service to produce PDFs and upload them to S3.

How it works now (no Google permissions required):

1. Go to Generate → upload a CSV file with header row.
2. The API parses the CSV and returns a preview (first 5 rows) and a count of rows.
3. If you have deployed a report-generator service and set the REPORT_GENERATOR_URL environment variable in your hosting environment, the API will forward each row as JSON to that service's /generate endpoint and collect returned URLs.

CSV column mapping:
- The server will try to map common column names automatically (report_no, client, date, item_name, result, etc.).
- If your sheet uses a custom format, update pages/api/generate.ts -> mapRowToPayload() to match your columns.

Running locally:
- npm install
- npm run dev
- Open http://localhost:3000/generate and upload a CSV

Next steps to integrate Colab/Sheets:
- Option A (manual): Download your Google Sheet as CSV and upload via the Generate page.
- Option B (automated): Create a Google Cloud service account and share the sheet with it; I'll add code to fetch the sheet server-side and process it automatically.
