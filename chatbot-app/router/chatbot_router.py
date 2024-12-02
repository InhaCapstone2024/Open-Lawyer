from fastapi import APIRouter
from schema import chatbot_schema
from service import chatbot_service

router = APIRouter(
    prefix="/api/chatbot",
)

@router.post("/prediction", response_model=chatbot_schema.ChatbotFirstResponse)
def get_prediction(chat: chatbot_schema.ChatbotRequset):
    return chatbot_service.cal_probability(chat.question)
    
@router.post("/question", response_model=chatbot_schema.ChatbotSecondResponse)
def get_answer(chat: chatbot_schema.ChatbotRequset):
    return chatbot_service.make_answer(chat.question)