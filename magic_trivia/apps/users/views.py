from django.shortcuts import render
from .models import CustomUser
from django.contrib.auth import authenticate, login
from apps.questions.views import load_dashboard
from django.shortcuts import redirect
# Create your views here.


def login_view(request):

    email = request.POST['email']
    password = request.POST['password']
    user = authenticate(request, email=email, password=password)

    if user is not None :
        print("Autenticado correctamente")
    else :
        print("Autenticado incorrectamente")
    
    return redirect('dashboard')
    