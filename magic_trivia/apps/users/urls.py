from django.contrib import admin
from django.urls import path,include
from .views import login_view,logout_view,register

urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view,name="logout"),
    path('register/', register,name="register"),
]
