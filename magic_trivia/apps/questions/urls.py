from django.contrib import admin
from django.urls import path,include
from .views import get_category,home,load_dashboard,load_questions,validate_question,game_over

urlpatterns = [
    path('', home.as_view(),name='home'),
    path('dashboard/', load_dashboard,name='dashboard'),
    path('questions/', load_questions,name='questions'),
    path('questions/validate/', validate_question,name='validate_question'),
    path('questions/game_over/', game_over.as_view(),name='game_over'),
]
