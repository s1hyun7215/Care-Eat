"""
backend/main.py
CareEat FastAPI 백엔드

역할:
  - React(Vite) 프론트에서 /api/analyze 로 POST 요청을 받음
  - Gemini API를 호출해 증상 → 영양소/영양제/식재료 JSON 반환
  - API 키가 서버에만 존재 → 브라우저에 노출되지 않음

실행:
  cd backend
  python -m venv .venv
  .venv\\Scripts\\activate         # Windows
  source .venv/bin/activate       # Mac/Linux
  pip install -r requirements.txt
  uvicorn main:app --reload --host 127.0.0.1 --port 8000
"""

import os
import json
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()  # 프로젝트 루트의 .env 파일 로드

app = FastAPI(title="CareEat API")

# CORS 설정 - Vite 개발 서버(5173)에서 오는 요청 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-1.5-flash:generateContent"
)

# Gemini responseSchema - JSON 구조 강제
RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "nutrients": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "reason": {"type": "string"},
                },
                "required": ["name", "reason"],
            },
        },
        "supplements": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {"keyword": {"type": "string"}},
                "required": ["keyword"],
            },
        },
        "foods": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "description": {"type": "string"},
                },
                "required": ["name", "description"],
            },
        },
    },
    "required": ["nutrients", "supplements", "foods"],
}


# ── 요청 바디 모델 ─────────────────────────────────────────
class AnalyzeRequest(BaseModel):
    symptom: str  # 사용자가 입력한 증상 (한글)


# ── 상태 확인 ──────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok", "gemini_key_set": bool(GEMINI_API_KEY)}


# ── 증상 분석 ──────────────────────────────────────────────
@app.post("/api/analyze")
async def analyze(req: AnalyzeRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY가 설정되지 않았습니다.")

    symptom = req.symptom.strip()
    if not symptom:
        raise HTTPException(status_code=400, detail="증상을 입력해주세요.")

    prompt = (
        f'사용자 증상: "{symptom}"\n\n'
        "위 증상에 필요한 영양소 3~5개와, 각 영양소를 섭취할 수 있는 "
        "영양제 키워드 및 식재료를 추천해줘.\n"
        "- 영양제는 쇼핑몰에서 바로 검색 가능한 짧은 키워드로 (예: \"루테인 영양제\")\n"
        "- 식재료는 실제 한국에서 구할 수 있는 재료로 (예: \"시금치\", \"블루베리\")\n"
        "- 의학적 조언이 아닌 일반적인 영양 정보 수준으로 답할 것"
    )

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": RESPONSE_SCHEMA,
        },
    }

    async with httpx.AsyncClient(timeout=30) as client:
        try:
            res = await client.post(
                GEMINI_URL,
                params={"key": GEMINI_API_KEY},
                json=payload,
            )
            res.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=502,
                detail=f"Gemini API 오류: {e.response.status_code}",
            )
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Gemini 연결 실패: {str(e)}")

    try:
        text = res.json()["candidates"][0]["content"]["parts"][0]["text"]
        result = json.loads(text)
    except (KeyError, json.JSONDecodeError) as e:
        raise HTTPException(status_code=502, detail=f"Gemini 응답 파싱 실패: {str(e)}")

    return result
