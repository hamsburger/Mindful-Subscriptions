import os
import cohere
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import string
import json

app = FastAPI(
    title="UofT Hack Backend API",
    description="",
    version="1",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Development code: Retrieve from local .env to os.environ dictionary for os.getenv() to work
load_dotenv()
# Get Cohere API key from os.env
co = cohere.Client(os.getenv("COHERE_API_KEY", default=None))


class HTTPError(BaseModel):
    detail: str

    class Config:
        schema_extra = {
            "example": {"detail": "HTTPException raised."},
        }


@app.get("/")
async def get_root():
    return {"Hello": "FastAPI BE server is running!"}


# Example testing cohere free trial API endpoint (it's slow lol)
@app.get("/test_co")
async def get_co():
    prompt = "I'm grinding a hackathon right now. List some positive affirmations that make me happy."
    response = co.generate(
        model="xlarge",
        prompt=prompt,
        max_tokens=50,
        temperature=1,
        k=0,
        p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop_sequences=["--"],
        return_likelihoods="NONE",
    )
    return {"prompt": prompt, "response": response.generations[0].text}
