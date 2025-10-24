from fastapi import FastAPI, HTTPException, UploadFile, File
from typing import Annotated
import time
import PyPDF2
import io
import groq
import dotenv
import os

dotenv.load_dotenv()

app = FastAPI(title="File Parser")

@app.get("/health")
def health():
    return {
        "status_code": 200,
        "time": time.time()
    }

def extract_text_from_pdf(file):
    pdf = PyPDF2.PdfReader(io.BytesIO(file))
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    return text

def get_resume_feedback(text):
    client = groq.Groq(api_key=os.getenv("GROQ_API_KEY"))

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",  # ✅ use a supported model
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
                    "5. Finally, rate the resume on a scale of 1–10 based on clarity, experience, and skill balance.\n\n"
                    "Return your feedback in **Markdown format**."
                )
            }
        ],
        temperature=0.6,
        max_completion_tokens=2048
    )

    # ✅ Properly handle response (not streamed)
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("analyseFile:app", host="0.0.0.0", port=8088, reload=True)
