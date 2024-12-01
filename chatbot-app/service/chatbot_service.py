from service.prob.infer import cal_prob
from service.chatbot.chatbot import get_answer

def cal_probability(question: str):
    return cal_prob(question)

def make_answer(question: str):
    return get_answer(question)