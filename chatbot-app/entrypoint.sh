#!/bin/sh

# 가상 환경이 없다면 생성
if [ ! -d ./venv ]; then
    echo "[INFO] >> Creating virtual environment..."
    python -m venv venv
fi

# 가상 환경 활성화 및 의존성 설치
echo "[INFO] >> Installing dependencies..."
. venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip freeze > requirements.txt

# .env 파일에서 환경 변수 로드
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# uvicorn 서버 실행
echo "[INFO] >> Starting the server..."
uvicorn main:app --host 0.0.0.0 --port ${SERVER_PORT} --reload