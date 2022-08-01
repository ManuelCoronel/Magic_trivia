from django.shortcuts import render
import requests
from apps.users.models import CustomUser
from django.views.generic import TemplateView, ListView
import random,html
import json
import time
from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .Serializers import correct_answer_serializer

# Create your views here.

def validate_question(request):

    score = get_score(request)
    request.session['score'] = score
    print("score",score)
    user = request.user
    if score >= user.best_score:
        if score == user.best_score:
            if len(request.session['questions']) < user.num_questions:
                user.num_questions = len(request.session['questions'])
                
        else :
            user.best_score = score
            user.num_questions = len(request.session['questions'])
    user.num_matches = user.num_matches + 1    
    user.save()
    

    
    
    return HttpResponse()

def get_score(request):
    
    answers = correct_answer_serializer(data = json.loads(request.body))
    score = 0
    if answers.is_valid() :
        questions = request.session['questions']
        print(questions)
        for i in range(0,len(questions)):
            print("i = ",i)
            print(html.unescape(questions[i]['correct_answer']))
            print(answers.data['answer_selected'][i])
            if (html.unescape(questions[i]['correct_answer']) == answers.data['answer_selected'][i]) :
                score += 1
        return score
        
    else :
        print(answers.errors)


def get_category():

    api_url = 'https://opentdb.com/api_category.php'
    response = requests.get(api_url)
    return response.json()

@login_required
def load_dashboard(request):
    template_name = 'dashboard.html'
    category = get_category()
    category = (category['trivia_categories'])
    myrange = list(range(5,51,5))
    return render (request,template_name,{'category':category, 'myrange':myrange, 'username':request.user.username} )



def get_questions(request):
    
    category = request.GET.get('category')
    difficulty = request.GET.get('difficulties')
    num_question = request.GET.get('num_question')
    api_url = "https://opentdb.com/api.php?amount="+num_question

    if category != '0' :
        api_url = api_url +'&category='+category
    if difficulty != '0' :
        api_url = api_url +'&difficulty='+difficulty

    api_url = api_url +"&type=multiple&token="+request.session['token']
    print("here")
    print(api_url)
    response = requests.get(api_url)    
    request.session['questions'] = response.json()['results'].copy()
    
    return clear_questions(request,response.json()['results'])

def clear_questions(request,questions):
    
    print("PREGUNTAS CARGADAS A LA SESION",request.session['questions'])
    for question in questions:
        n = random.randint(0,3)
        question['incorrect_answers'].insert(n,question['correct_answer'])
        question['correct_answer'] = "none"  
    print(request.session['questions'])
    return questions

def load_questions(request):
    print("Bien")
    questions = get_questions(request)
    template_name = 'questions.html'
    
    return render (request,template_name,{'questions':questions} )

def game_over(request):
    template = "game_over.html"
    queryset = CustomUser.objects.values_list("username","best_score","num_questions","num_matches").order_by('-best_score',"num_questions","num_matches")
    print("Lista ",queryset)
    time.sleep(2)
    score = request.session['score']
    questions = len(request.session['questions'])
    return render (request,template,{"users":queryset,"score":score,"questions":questions})



class home(TemplateView):
    template_name = "index.html"
