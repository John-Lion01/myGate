from django.db import models
from parler.models import TranslatableModel, TranslatedFields

# Create your models here.
class Config(TranslatableModel) :
    translation = TranslatedFields(
        home_description = models.TextField(),
    )
    name = models.CharField(max_length=50)

    logo = models.ImageField(upload_to='folio/config', blank=True, name='logo')
    main_image = models.ImageField(upload_to='folio/config', blank=True, name='main_image')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class About(TranslatableModel) :
    translation =TranslatedFields(
        text1 = models.TextField(),
        text2 = models.TextField(),
        text3 = models.TextField()
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class RequestInfo(models.Model) :
    domain = models.CharField()
    url = models.URLField()
    ip = models.CharField()
    when = models.DateTimeField()

    country = models.CharField(blank=True,null=True)
    city = models.CharField(blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"conn : {self.url}; {self.when}"