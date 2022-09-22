"""magic_trivia URL Configuration"""

from django.contrib import admin
from django.urls import path,include,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
main_path = 'magic/'

urlpatterns = [
    path(main_path+'admin/', admin.site.urls),
    path(main_path+'',include('apps.questions.urls')),
    path(main_path+'account/',include('apps.users.urls')),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
