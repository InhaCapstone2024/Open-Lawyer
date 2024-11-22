#!/bin/sh
if [ ! -d /fastapi-app/venv ]; then \
    echo "[INFO] >> Installing dependencies, please wait..." && \
    python -m venv venv && \
    source venv/bin/activate && \
    pip install -r requirements.txt && \
    pip freeze > requirements.txt \
;else \
    echo "[INFO] >> Ready to launch server, checking new dependencies, please wait..." && \
    source venv/bin/activate && \
    pip install -r requirements.txt && \
    pip freeze > requirements.txt \
;fi

# .env 파일에서 환경 변수 로드
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# uvicorn 서버 실행
uvicorn main:app --host 0.0.0.0 --port ${SERVER_PORT} --reload