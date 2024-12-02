import numpy as np
import torch
from transformers import AutoTokenizer, AutoModel

from service.prob import networks

class Dataset:
    def __init__(self, data): 

        self.dataset = []

        first_emb = data['first_party']
        second_emb = data['second_party']
        fact_emb = data['facts']

        if len(first_emb.shape) > 1:
            first_emb = first_emb[0]
            second_emb = second_emb[0]
            fact_emb = fact_emb[0]
            
        self.dataset.append([first_emb, second_emb, fact_emb])
    
    def __len__(self):
        return len(self.dataset)
    
    def __getitem__(self, index):
        first, second, fact = self.dataset[index]
        return first.astype(np.float32), second.astype(np.float32), fact.astype(np.float32)
    
    
def cal_prob(input: str):
    # 사용자 입력 모델에 맞게 변환
    first_party = '검    사'
    second_party = '피고인'
    facts = input.replace('\n', ' ')
    
    # KoBERT 호출
    tokenizer = AutoTokenizer.from_pretrained('./service/KoBERT', trust_remote_code=True)
    model = AutoModel.from_pretrained('./service/KoBERT', trust_remote_code=True)

    #device = torch.device('cuda:0')
    #model = model.to(device)
    model.eval()
    
    # 사용자 입력 임베딩 생성
    embeddings = []

    for input_data in [first_party, second_party, facts]:
        encoded_input = tokenizer([input_data], padding=True, truncation=True, return_tensors='pt')#.to(device)
        with torch.no_grad():
            model_output = model(**encoded_input)
            embedding = model_output.pooler_output[0].cpu().detach().numpy()  
    
        embeddings.append(embedding)
    
    emb_dict = {
        'first_party': embeddings[0],
        'first_party_name': first_party,

        'second_party': embeddings[1],
        'second_party_name': second_party,

        'facts': embeddings[2],
    }
    
    test_dataset = Dataset(emb_dict)
    
    # 승소 확률 예측
    model = networks.CosClassifier(768)
        
    #model.cuda()
    model.eval()
    model.load_state_dict(torch.load(f'./service/prob/models/infer_prob_model.pth', map_location=torch.device('cpu')))

    first, second, fact = test_dataset[0]

    # if you use cuda, inser .cuda() between from_numpy and unsqueeze
    first = torch.from_numpy(first).unsqueeze(0)
    second = torch.from_numpy(second).unsqueeze(0)
    fact = torch.from_numpy(fact).unsqueeze(0)

    with torch.no_grad():
        prob = torch.softmax(model(first, second, fact)[0], dim=0)
        prob = prob.cpu().detach().numpy()
        
        # 피고인 (user) 승소 확률 return
        # prob[0] -> 검사 승일 확률, prob[1] -> 피고인 승일 확률
        return {'probability': prob[1]}
    