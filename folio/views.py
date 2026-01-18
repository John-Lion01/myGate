from django.shortcuts import render, redirect
from .models import Config, About, RequestInfo, Project
from django.utils import timezone
from django.http.request import HttpRequest
from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse
from django.forms.models import model_to_dict
# Create your views here.
def save_request(request : WSGIRequest) :
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
    url : str = request.build_absolute_uri()
    domain = request.get_host()
    if domain.startswith("127.0.0.1") :
        return

    data = RequestInfo(
        domain = domain,
        url = url,
        ip =  ip,
        when = timezone.now()
    )
    data.save()
    return JsonResponse(model_to_dict(data))

def get_request(view):
    def getter(request) :
        save_request(request)
        return view(request)
    return getter

@get_request
def folio(request) :
    config = Config.objects.first()
    about = About.objects.first()
    top_project = Project.objects.filter(visible=True, top=True)
    return render(
        request,
        'folio/folio.html',
        {
            'config' : config,
            'about' : about,
            'projects' : top_project,
            'proj' : top_project.first(),
        }
    )

@get_request
def home(request) :
    return redirect("https://john-lion.netlify.app/")

@get_request
def test(request) :
    return render(
        request,
        'folio/index.html'
    )