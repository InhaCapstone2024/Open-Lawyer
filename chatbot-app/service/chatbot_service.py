from service.apis.cal_probability import chatbot_func_probability
from service.apis.make_answer import chatbot_func_answer

def cal_probability(question: str):
    return chatbot_func_probability(question)

def make_answer(question: str):
    return chatbot_func_answer(question)