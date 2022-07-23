from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    nick = models.CharField(max_length=100)
    email = models.EmailField(max_length=120)
    best_score = models.IntegerField(default=0)
    num_matches = models.IntegerField(default=0)
    password = models.CharField(max_length=50)

