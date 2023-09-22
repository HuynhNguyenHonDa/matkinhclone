from django import forms
from django.contrib import admin

from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import CustomerGratitude


class CustomerGratitudeForm(forms.ModelForm):

    content = forms.CharField(widget=CKEditorUploadingWidget())


class CustomerGratitudeAdmin(admin.ModelAdmin):
    form = CustomerGratitudeForm

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# admin.site.register(CustomerGratitude, CustomerGratitudeAdmin)
