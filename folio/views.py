from django.shortcuts import render, redirect
from .models import Config
# Create your views here.

def folio(request) :
    config = Config.objects.first()
    return render(
        request,
        'folio/folio.html',
        {
            'config' : config,
        }
    )

def home(request) :
    return redirect("https://john-lion.netlify.app/")