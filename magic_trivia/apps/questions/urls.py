from django.contrib import admin
from django.urls import path,include
from .views import get_category,home,load_dashboard,load_questions

urlpatterns = [
    path('', home.as_view(),name='home'),
    path('dashboard/', load_dashboard,name='dashboard'),
    path('questions/', load_questions,name='questions'),
]
