import json
import csv
from RemoveInvalidos import removeInvalidos, geraDicionarioComentarios

def main(args):
    titulo = args["titulo"]
    comentarios = args["comentarios"]
    comentariosVideos = geraDicionarioComentarios(titulo, comentarios)




main()