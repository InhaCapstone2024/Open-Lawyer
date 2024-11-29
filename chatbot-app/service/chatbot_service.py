from service.prob_service.infer import cal_prob
from service.chatbot_service.chatbot import get_answer

def cal_probability(question: str):
    return cal_prob(question)

def make_answer(question: str):
    return get_answer(question)