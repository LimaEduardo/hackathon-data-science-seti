from langdetect import detect
from nltk.tokenize import RegexpTokenizer

def removeInvalidos(texto):
    tokenizer = RegexpTokenizer(r'[a-zA-Z]+')
    resultado = " ".join(tokenizer.tokenize(texto))
    if(len(resultado) == 0):
        return ""
    deteccao = detect(resultado)
    if(deteccao != "en"):
        return ""
    return resultado

def geraDicionarioComentarios(videos, comentarios, maximoComentarios):
    comentariosVideo = {}
    quantidadeAdicionadaVideo = {}
    for comentario in comentarios:
        comentariosVideo= geraDicionarioComentario(comentario, comentariosVideo, 
                                                    quantidadeAdicionadaVideo, maximoComentarios)
    return comentariosVideo

        
def geraDicionarioComentario(comentario, comentariosVideo, quantidadeAdicionadaVideo, maximoComentarios):
    try:
        if(quantidadeAdicionadaVideo[comentario[0]] < maximoComentarios):
            comentarioSemPontuacao = removeInvalidos(comentario[1].replace("\\n", " "))
            if(comentarioSemPontuacao != ""):
                comentariosVideo[comentario[0]] += " " + comentarioSemPontuacao
                quantidadeAdicionadaVideo[comentario[0]] += 1
    except KeyError:
        comentarioSemPontuacao = removeInvalidos(comentario[1].replace("\\n", " "))
        if(comentarioSemPontuacao != ""):
            comentariosVideo[comentario[0]] = comentarioSemPontuacao
            quantidadeAdicionadaVideo[comentario[0]] = 1
    
    return comentariosVideo

def uneTituloComentarios(video, comentarios, chave):
    texto = removeInvalidos(video[1])
    try:
        texto += " " + comentarios[chave]
    except KeyError:
        pass
    
    return texto