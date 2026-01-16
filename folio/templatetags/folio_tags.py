from django import template

from folio.models import Project
import json

register = template.Library()

def get_data(obj : Project) -> dict :
    data = {
        "title": obj.title,
        "description": obj.description,
        "tools": obj.tools,
        "web": obj.web,
        "github": obj.github,
        "main_image": obj.images.first().image.url,
        "images": [
            image.image.url for image in obj.images.all()
        ]
    }
    return data

@register.filter
def obj_dict(obj : Project) :
    data = get_data(obj)
    return json.dumps(data, ensure_ascii=False)

@register.filter
def query_dict(objects : Project.objects.get_queryset()):
    data = []
    for obj in objects :
        data.append(
            get_data(obj)
        )
    return json.dumps(data)