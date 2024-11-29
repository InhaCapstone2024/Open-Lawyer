import json
import tqdm
import glob
import torch
import pickle
import numpy as np

from transformers import AutoTokenizer, AutoModel
import networks

class Dataset:
    def __init__(self, data): 

        self.dataset = []

        test_id = data['test_id'] 
        first_emb = data['first_party']
        second_emb = data['second_party']
        fact_emb = data['facts']

        if len(first_emb.shape) > 1:
            first_emb = first_emb[0]
            second_emb = second_emb[0]
            fact_emb = fact_emb[0]
            
        self.dataset.append([test_id, first_emb, second_emb, fact_emb])
    
    def __len__(self):
        return len(self.dataset)
    
    def __getitem__(self, index):
        test_id, first, second, fact = self.dataset[index]
        return test_id, first.astype(np.float32), second.astype(np.float32), fact.astype(np.float32)
    
    
if __name__ == '__main__':
    model_name = 'KoBERT'
    
    # 사용자로부터 입력이 json 형태로 온다고 가정
    test_data = json.load(open('../data/test.json', 'r', encoding='utf-8'))
    first_party = test_data[0]['The first party']
    second_party = test_data[0]['The second party']
    facts = test_data[0]['facts'].replace('\n', ' ')
    
    # KoBERT 호출
    model_name = 'monologg/kobert'
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
    model = AutoModel.from_pretrained(model_name, trust_remote_code=True)

    device = torch.device('cuda:0')
    model = model.to(device)
    model.eval()
    
    # 사용자 입력 임베딩 생성
    embeddings = []

    for input_data in [first_party, second_party, facts]:
        encoded_input = tokenizer([input_data], padding=True, truncation=True, return_tensors='pt').to(device)
        with torch.no_grad():
            model_output = model(**encoded_input)
            embedding = model_output.pooler_output[0].cpu().detach().numpy()  
    
        embeddings.append(embedding)
    
    emb_dict = {
        'test_id': test_data[0]['test_id'], # 'TEST_000'으로 고정

        'first_party': embeddings[0],
        'first_party_name': first_party,

        'second_party': embeddings[1],
        'second_party_name': second_party,

        'facts': embeddings[2],
    }
    
    test_dataset = Dataset(emb_dict)
    
    # 승소 확률 예측
    model = networks.CosClassifier(768)
        
    model.cuda()
    model.eval()
    model.load_state_dict(torch.load(f'./models/infer_prob_model.pth'))

    for i in tqdm.tqdm(range(len(test_dataset))):
        test_ids = []
        preds = []
        probs = []
        uncertainties = []
        
        test_id, first, second, fact = test_dataset[i]

        first = torch.from_numpy(first).cuda().unsqueeze(0)
        second = torch.from_numpy(second).cuda().unsqueeze(0)
        fact = torch.from_numpy(fact).cuda().unsqueeze(0)

        with torch.no_grad():
            prob = torch.softmax(model(first, second, fact)[0], dim=0)
            prob = prob.cpu().detach().numpy()
            
            # 승소 확률 프린트
            # prob[0] -> 검사 승일 확률, prob[1] -> 피고인 승일 확률
            print(f'Prob of {test_id} : {prob}')