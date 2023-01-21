import os
import cohere
from dotenv import load_dotenv
from typing import Union
from fastapi import FastAPI, HTTPException, status, Query

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import string
import json

from qa.bot import GroundedQaBot

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
# Get cohere and serp api keys and 
bot = GroundedQaBot(os.getenv("COHERE_API_KEY", default=None), os.getenv("SERP_API_KEY", default=None))

@app.get("/cohere_qa_bot")
async def get_subscription_pricing_plans(q: Union[str, None] = Query(default=None, max_length=50)):
    # question = input("question: ")
    question =  "what are the pricing plans for "+ q + "?"
    print(question)
    reply, source_urls, source_texts = bot.answer(question, verbosity=0, n_paragraphs=2)
    sources_str = "\n".join(list(set(source_urls)))
    reply_incl_sources = f"{reply}\nSource:\n{sources_str}"
    print("answer: " + reply_incl_sources)
    response = reply_incl_sources
    return {"question": question, "response": response}

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

# Fetch mock response data
@app.get("/test_mock")
async def get_mock():
    with open("../mock_res.json", "r") as f:
        response = json.load(f)
        return response

# Post csv file
@app.post("/statement")
async def post_statement():
    pass
