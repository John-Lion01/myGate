from django.contrib import admin
from parler.admin import TranslatableAdmin
import requests
from .models import Config, About, RequestInfo, Project, ProjectImage, Message


# Register your models here.
@admin.register(Config)
class ConfigAdmin(TranslatableAdmin):
    list_display = ['id', 'name', 'updated']
    list_editable = ['name']

    def has_add_permission(self, request):
        return len(Config.objects.all())<1

@admin.register(About)
class AboutAdmin(TranslatableAdmin):
    list_display = ['id', 'updated']

    def has_add_permission(self, request):
        return not About.objects.exists()

@admin.register(RequestInfo)
class RequestAdmin(admin.ModelAdmin) :
    list_display = ['id', 'when', 'domain', 'country']
    readonly_fields = ['country', 'city']
    list_filter = ['domain', 'ip', 'country']

    def change_view(self, request, object_id, form_url="", extra_context=None):
        data: RequestInfo = RequestInfo.objects.get(id=object_id)
        if data.country == '' or data.city == '' or data.country is None or data.city is None:
            url = f"https://ipinfo.io/{data.ip}/json"
            try :
                response = requests.get(url).json()
            except ConnectionError:
                pass
            else:
                data.country = response.get("country")
                data.city = response.get("city")
                data.save()
            return super().change_view(request, object_id, form_url, extra_context)
            #JsonResponse(model_to_dict(data))
        return super().change_view(request, object_id, form_url, extra_context)
        #JsonResponse({"a" : "74848 ffe", 'data' : model_to_dict(data)})

class ImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0

@admin.register(Project)
class ProjectAdmin(TranslatableAdmin):
    list_display = ['title', 'id', 'visible', 'top', 'updated']
    list_filter = ['visible', 'top', 'updated']
    list_editable = ['visible', 'top']

    inlines = [ImageInline]

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin) :
    list_display = ["full_name", "email", "sujet", "updated"]
    list_filter = ["sujet", "updated", "email"]
    readonly_fields = ["full_name", "email", "sujet", "message", "created"]

    def has_add_permission(self, request):
        return False

