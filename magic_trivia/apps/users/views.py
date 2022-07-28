from django.shortcuts import render
from .models import CustomUser
from django.contrib.auth import authenticate, login
from apps.questions.views import load_dashboard
from django.shortcuts import redirect
from django.contrib.auth import logout
import requests
# Create your views here.


def login_view(request):

    email = request.POST['email']
    password = request.POST['password']
    user = authenticate(request, email=email, password=password)
    
    if user is not None :
        print("Autenticado correctamente")
        login(request,user)
        request.session['token'] = get_token()
        return redirect('dashboard')
    else :
        print("Autenticado incorrectamente")


def logout_view(request):
    logout(request)
    return redirect('home')
    
def get_token():
    api_url = 'https://opentdb.com/api_token.php?command=request'
    response = requests.get(api_url)
    return response.json()['token']    
    
