import json
import csv
from TrataComentarios import removeInvalidos, geraDicionarioComentario, uneTituloComentarios

def main(args):
    titulo = args["title"]
    comentarios = args["comments"]
    comentariosVideos = {}
    quantidadeAdicionadaVideo = {}
    for comentario in comentarios:
        comentariosVideos = geraDicionarioComentario([0, comentario], comentariosVideos, quantidadeAdicionadaVideo, 10)

    texto = uneTituloComentarios([0, titulo], comentariosVideos, 0)
    print(texto)
    




main({"title" : "I hate the americans", "comments" : ["TOP", "good, little boy", "ooh little guy!", "this one i already know that he could win on life", "suuuucks dilma"]})