from django.shortcuts import render
import requests
from django.views.generic import TemplateView
# Create your views here.

def get_category():
    api_url = 'https://opentdb.com/api_category.php'
    response = requests.get(api_url)
    print(response.json())
    return response.json()


class home(TemplateView):
    template_name = "index.html"
