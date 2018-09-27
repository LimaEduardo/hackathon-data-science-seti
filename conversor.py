import json
import csv
from TrataComentarios import geraDicionarioComentarios, uneTextoComentarios




def readFileCSV(fileName):
    with open(fileName, 'rt') as ficheiro:
        reader = csv.reader(ficheiro, delimiter = ",")
        print(reader)
        resultado = []
        for linha in reader:
            resultado.append(linha)
    return resultado


def writeFileCSV(dadosLimpos, fileName):
    print("Writing in "+ fileName)
    with open(fileName, "w", newline="") as csvfile:
        fieldnames = ["id", "title", "assignable"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for ide in dadosLimpos:
            writer.writerow({"id" : ide, "title" : dadosLimpos[ide][0], "assignable" : dadosLimpos[ide][1]})
    print("Done!")


def juntaDados(videos, categorias, comentarios):
    fileName = "arquivo-final.csv"
    print("UI")
    comentariosVideo = geraDicionarioComentarios(videos, comentarios, 100)
    with open(fileName, "w", newline="") as csvfile:
        # fieldnames = ["id", "text", "channel", "category_title", "assignable", "tags", "views", "likes",
        #                 "dislikes", "comment_total"]
        fieldnames = ["text", "category_title"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        # print(videos)
        for elemento in videos:
            titulo = None
            # print(elemento)
            try:
                titulo = categorias[elemento[3]][0]
            except KeyError:
                titulo = "UNKNOWN"
            
            texto = uneTextoComentarios(elemento, comentariosVideo, elemento[0])
            

            print(texto)
            print("------------------------")
            # writer.writerow({"id" : elemento[0], "text" : texto, "channel" : elemento[2], 
            #                 "category_title" : titulo, "assignable" : assignable, "tags" : elemento[4], 
            #                 "views" : elemento[5], "likes" : elemento[6], "dislikes" : elemento[7], 
            #                 "comment_total" : elemento[8]})
            
            writer.writerow({"text" : texto, "category_title" : titulo})
            

def main():
    arquivo = open("Category.json").read()
    resultado = json.loads(arquivo)
    dadosLimpos = {}
    for elemento in resultado["items"]:
        dadosLimpos[elemento["id"]] = [elemento["snippet"]["title"], elemento["snippet"]["assignable"]]

    videos = readFileCSV("Statistics.csv")
    del videos[0]

    comments = readFileCSV("Comments.csv")
    del comments[0]
    juntaDados(videos, dadosLimpos, comments)

main()


