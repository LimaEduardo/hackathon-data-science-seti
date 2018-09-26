from nltk.tokenize import RegexpTokenizer

tokenizer = RegexpTokenizer(r'\w+')
teste = "Thuza is a very good boy.\n He is too much 10!"
print(tokenizer.tokenize(teste))
