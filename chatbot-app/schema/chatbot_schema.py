from pydantic import BaseModel

class ChatbotRequset(BaseModel):
    question: str
    
class ChatbotFirstResponse(BaseModel):
    answer: str
    probability: float
    
class ChatbotSecondResponse(BaseModel):
    answer: str