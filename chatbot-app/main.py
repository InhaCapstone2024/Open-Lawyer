from fastapi import FastAPI
from core.docs import *
from starlette.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

def get_server():
    server = FastAPI(
        title='Chatbot', 
        docs_url="/docs", redoc_url=None,
        version="1.0.0",
        description=chatbot_description,
        openapi_url="/openapi.json"
    )
    server.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )
    server.add_middleware(
        GZipMiddleware, minimum_size=1000
    )

    return server

app = get_server()

@app.get('/api/ping', tags=['Root'])
def ping():
    return 200