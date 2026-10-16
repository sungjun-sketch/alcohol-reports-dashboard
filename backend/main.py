from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import gspread
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Alcohol Test Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 실제 운영 시에는 프론트엔드 도메인으로 변경
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CREDENTIALS_FILE = "credentials.json"
SHEET_URL = "https://docs.google.com/spreadsheets/d/1sVL2KFGBqfOH7Ex9zWmoHHf9xLUhmGD3E9TotMbGWtk/edit"

try:
    gc = gspread.service_account(filename=CREDENTIALS_FILE)
    spreadsheet = gc.open_by_url(SHEET_URL)
except Exception as e:
    print(f"구글 시트 연동 실패: {e}")
    gc = None

class TestTarget(BaseModel):
    id: str
    receiveDate: str
    materialCode: str
    materialName: str
    vendor: str
    quantity: str
    status: str

@app.get("/")
def read_root():
    return {"message": "알코올러빙 시험 관리 API 서버 실행 중"}

@app.get("/api/targets", response_model=List[TestTarget])
def get_test_targets():
    if not gc:
        raise HTTPException(status_code=500, detail="Google Sheets 연동이 설정되지 않았습니다.")
    
    try:
        worksheet = spreadsheet.worksheet("대상품목/전체+DDP")
        all_rows = worksheet.get_all_values()
        
        if len(all_rows) <= 1:
            return []

        data = []
        for index, row in enumerate(all_rows[1:]):
            if not row or not row[0]:
                continue
            
            def get_cell(idx, default=""):
                return row[idx].strip() if len(row) > idx else default

            target = TestTarget(
                id=str(index + 1),
                receiveDate=get_cell(0),
                materialCode=get_cell(1),
                materialName=get_cell(2),
                vendor=get_cell(3),
                quantity=get_cell(4),
                status=get_cell(13, "선접수") 
            )
            data.append(target)
            
        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
