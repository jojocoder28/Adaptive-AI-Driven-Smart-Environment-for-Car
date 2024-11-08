from fastapi import FastAPI, HTTPException, Form
import google.generativeai as genai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')


@app.post("/generate-navigation/")
async def generate_navigation(start_point: str = Form(...), destination: str = Form(...), include_pois: bool = Form(True)):
    try:
        # Generate response logic here
        prompt = f"Create detailed and user friendly driving instructions from {start_point} to {destination}. Make it very effective."
        if include_pois:
            prompt += " Include points of interest along the route."
        
        response = model.generate_content(prompt)

        if response is None:
            raise ValueError("No response generated")

        return {
            "start_point": start_point,
            "destination": destination,
            "instructions": response.text
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

