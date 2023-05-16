from django.db import models

from ckeditor_uploader.fields import RichTextUploadingField


class CustomerGratitude(models.Model):
    content = RichTextUploadingField(blank=True, null=True)
    image = models.ImageField(upload_to='store/images', default='store/images/default.png')
