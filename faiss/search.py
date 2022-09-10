# 从目录中加载原始数据
from os import walk
import pandas as pd

dataDir = "./data/output"
allFiles = next(walk(dataDir), (None, None, []))[2]
frames = []
for i in range(len(allFiles)):
    file = allFiles[i]
    print(file)
    frames.append(pd.read_csv("./data/output/"+file, sep="`",
                              header=None, names=["sentence"]))
df = pd.concat(frames, axis=0, ignore_index=True)
print("载入原始数据完毕，数据量", len(df))

# 加载预处理数据
import numpy as np
sentences = df['sentence'].tolist()
sentence_embeddings = np.load("data.npy")
print("载入向量数据完毕，数据量", len(sentence_embeddings))

# 使用构建向量时的模型来构建向量索引
import faiss
dimension = sentence_embeddings.shape[1]
quantizer = faiss.IndexFlatL2(dimension)
nlist = 50
index = faiss.IndexIVFFlat(quantizer, dimension, nlist)
index.train(sentence_embeddings)
index.add(sentence_embeddings)
print("建立向量索引完毕，数据量", index.ntotal)

# 尝试进行查询
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('uer/sbert-base-chinese-nli')
print("载入模型完毕")

topK = 10
search = model.encode(["如何看待人工智能技术"])
D, I = index.search(search, topK)
ret = df['sentence'].iloc[I[0]]
print(ret)