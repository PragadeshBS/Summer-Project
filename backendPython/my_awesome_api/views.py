# from curses.ascii import isalnum
from .collaborative_filtering import *
from http import client
import imp
from rest_framework.views import APIView
from rest_framework import status
from PIL import Image
import pytesseract
from django.http import JsonResponse
import re
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient, mongo_client
import pandas as pd
import numpy as np
# mongo DB creditionals
client = MongoClient(
    'mongodb+srv://dbuser:hello123@cluster0.wvyarrx.mongodb.net/?retryWrites=true&w=majority')
# Create your views here.


def filter(arr):
    res = []
    for i in arr:
        s = []
        i = i.strip()
        alp = False
        for j in i:
            if(j.isalnum() or alp):
                s.append(j)
                alp = True
            elif(j == ' ' and alp):
                s.append(j)
            else:
                continue
        for j in range(len(s)-1, -1, -1):
            if(s[j].isalnum()):
                break
            else:
                s.pop(j)
        x = "".join(s)
        res.append(x.lower())
    return res


class PostView(APIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        x = request.FILES['img']
        ans = []
        print(type(x))
        imd = Image.open(x)
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        ans = pytesseract.image_to_string(imd)
        ans = ans.replace("\n", " ")
        print(ans)
        ans = ans.split(" ")
        ans = filter(ans)
        res = []
        for i in ans:
            if len(i) > 3:
                res.append(i)

        return JsonResponse({"res": res}, status=status.HTTP_200_OK)


class Reccomend(APIView):
    @csrf_exempt
    def get(self, request, id):
        return JsonResponse({"similarEvents": getSimilarEvents(id)}, status=status.HTTP_200_OK)
