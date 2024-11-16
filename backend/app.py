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

@app.post("/voice-command/")
async def voice_command(input_text: str = Form(...)):
    """
    Endpoint to receive a voice command as text, process it using Gemini, and return the response.
    """
    try:
        if not input_text:
            raise ValueError("Input text cannot be empty")
        
        # Generate response from the Gemini model
        response = model.generate_content("Your name is Nova. You are a smart AI assistant of the Car, your responsibiliy is to help the car driver and also the pessengers to make feel comfortable in the car. Now give answers to the questions : " + input_text + "  Only give the perfect response to the user, act as an AI voice assistant.")

        if response is None or not response.text:
            raise ValueError("No response generated from the model")

        return {
            "input_text": input_text,
            "response": response.text
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
    


@app.post("/generate-playlist/")
async def voice_command(input_text: str = Form(...)):
    """
    Endpoint to receive a voice command as text, process it using Gemini, and return the response.
    """
    try:
        if not input_text:
            raise ValueError("Input text cannot be empty")
        
        # Generate response from the Gemini model
        response = model.generate_content(input_text)

        if response is None or not response.text:
            raise ValueError("No response generated from the model")

        return {
            "input_text": input_text,
            "response": response.text
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")