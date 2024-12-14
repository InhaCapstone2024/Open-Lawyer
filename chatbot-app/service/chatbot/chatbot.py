import os
import torch
import pymysql
import boto3

from transformers import AutoTokenizer, AutoModel
from langchain_aws import ChatBedrock
from pinecone import Pinecone

# chatbot 호출 함수
def bedrock_chatbot(input_text):
    client = boto3.client('bedrock-runtime',
        region_name=os.environ.get('AWS_DEFAULT_REGION', '').strip(),
        aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID', '').strip(),
        aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY', '').strip()    
    )
    bedrock_llm = ChatBedrock(
        model_id='anthropic.claude-3-5-sonnet-20240620-v1:0',
        client=client,
        model_kwargs= {
            "temperature": 0.5,
            "top_p": 1,
            "top_k": 250,
        })
    return bedrock_llm.invoke(input_text)

# Find similar vectors from Pinecone
def find_similar_vecs(embedding):
    # Pinecone setting
    PC_API_KEY = os.environ.get('PINECONE_API_KEY', '').strip()
    pc = Pinecone(api_key=PC_API_KEY)
    index_name = 'courtcase'
    index = pc.Index(index_name)
    
    # Get similar cases from pinecone
    results = index.query(
        namespace="ns1",
        vector=embedding.tolist(),
        top_k=3,
        include_metadata=False
    )

    # 검색 결과에서 ID 추출
    similar_ids = [match["id"] for match in results["matches"]]
    return similar_ids

# Find similar cases from MySQL
def find_similar_cases(similar_ids):
    # MySQL 연결
    connection = pymysql.connect(
        host=os.environ.get('MYSQL_HOSTNAME').strip(),
        user=os.environ.get('MYSQL_USERNAME').strip(),
        password=os.environ.get('MYSQL_PASSWORD').strip(),
        database=os.environ.get('MYSQL_DATABASE').strip()
    )

    # ID를 기반으로 원본 텍스트 조회
    with connection.cursor() as cursor:
        # ID를 쿼리에 사용 (IN 절)
        id_list = ', '.join(f"'{id}'" for id in similar_ids)
        query = f"SELECT CONTENT FROM CaseInfo WHERE CASE_ID IN ({id_list})"
        cursor.execute(query)

        # 결과 가져오기
        results = cursor.fetchall()

    # 결과를 LLM prompt에 쓰일 수 있도록 하나의 문자열로 변환
    prompt = ""
    for i, row in enumerate(results):
        prompt += f"{i+1}번 판결문 : {row}\n"
    
    return prompt

# chatbot 답변 받아오는 함수
def get_answer(input: str):
        
    # Create Embedding for query
    model_name = 'monologg/kobert'
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(model_name, trust_remote_code=True)
    model.eval()

    input = input.replace('\n', ' ')  
    encoded_input = tokenizer(input, padding=True, truncation=True, return_tensors='pt')
    with torch.no_grad():
        model_output = model(**encoded_input)
        embedding = model_output.pooler_output[0].cpu().detach().numpy()

    similar_ids = find_similar_vecs(embedding)
    prompt = find_similar_cases(similar_ids)

    # bedrock_chatbot 함수에 사용자 입력 전달
    response = bedrock_chatbot(f'{prompt} 위의 판결문들을 참고한 다음, 다음 문장에서 주어지는 상황을 단계별로 분석한 뒤, 최종적으로 피고인이 무죄일지 아닐지 알려줘. 상황:{input}. 답변은 마크다운 형식으로 줘.').content

    return {'answer': response}