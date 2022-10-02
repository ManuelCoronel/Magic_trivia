FROM python:3.8-slim-buster

WORKDIR /app

COPY Magic_trivia/magic_trivia/requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

ENV django-key django-insecure-w_nf2*3!@c3gc=owm&0gqnsid87yfc2(g2+#qc$yy#-@c7i12e
COPY . .


CMD ["python3","Magic_trivia/magic_trivia/manage.py","runserver","0.0.0.0:8000"]