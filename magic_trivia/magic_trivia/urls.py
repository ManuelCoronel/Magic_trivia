"""magic_trivia URL Configuration"""

from django.contrib import admin
from django.urls import path,include


main_path = 'magic/'

urlpatterns = [
    path(main_path+'admin/', admin.site.urls),
    path(main_path+'',include('apps.questions.urls')),
    path(main_path+'account/',include('apps.users.urls')),
]
