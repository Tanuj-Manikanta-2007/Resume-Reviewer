from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Annotated
import time
import PyPDF2
import io
import groq
import dotenv
import os

dotenv.load_dotenv()

app = FastAPI(title="Resume Reviewer")

# ----------------- Middleware -----------------

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional logging middleware
class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start_time = time.time()
        response = await call_next(request)
        duration = time.time() - start_time
        print(f"{request.method} {request.url} completed in {duration:.2f}s")
        return response

app.add_middleware(LoggingMiddleware)

# ----------------- Routes -----------------

@app.get("/health")
def health():
    return {"status_code": 200, "time": time.time()}

def extract_text_from_pdf(file):
    pdf = PyPDF2.PdfReader(io.BytesIO(file))
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    return text

def get_resume_feedback(text):
    client = groq.Groq(api_key=os.getenv("GROQ_API_KEY"))
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": (
                    f"Here is a resume:\n\n{text}\n\n"
                    "Please analyze it and provide:\n"
                    "1. Key strengths\n"
                    "2. Weaknesses or missing sections\n"
                    "3. Concrete improvement suggestions\n"
                    "4. Skills or projects that could make it better\n"
                    "5. Rate the resume on a scale of 1–10 (clarity, experience, skill balance)\n\n"
                    "Return your feedback in Markdown format."
                ),
            }
        ],
        temperature=0.6,
        max_completion_tokens=2048,
    )
    return completion.choices[0].message.content

@app.post("/analyseFile")
async def file_operation(file: Annotated[UploadFile, File()]):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
    file_bytes = await file.read()
    text = extract_text_from_pdf(file_bytes)
    if not text:
        raise HTTPException(status_code=400, detail="No readable text found in PDF.")
    feedback = get_resume_feedback(text)
    return {"summary": feedback}

# ----------------- Main -----------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("analyseFile:app", host="0.0.0.0", port=8088, reload=True)
