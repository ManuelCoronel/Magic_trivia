from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    best_score = models.IntegerField(default=0)
    num_matches = models.IntegerField(default=0)
    

