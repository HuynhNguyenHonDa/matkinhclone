from django import forms
from django.contrib import admin

from .models import (
    Contact,
    EmailConfig,
    ImageManagement,
    InsuranceConfig,
    MainBackgroundImage,
    ConfigPromotionRegister,
    EmailReceiveOrder,
    FontConfig,
)


class ContactAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class FontAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
    

class EmailConfigAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class MainBackgroundImageInline(admin.TabularInline):
    model = MainBackgroundImage

class ImageManagementAdmin(admin.ModelAdmin):
    inlines = [MainBackgroundImageInline]

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class InsuranceConfigForm( forms.ModelForm ):
    description = forms.CharField(widget=forms.Textarea)


class InsuranceConfigAdmin(admin.ModelAdmin):
    form = InsuranceConfigForm

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
    

class ConfigPromotionRegisterAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(Contact, ContactAdmin)
admin.site.register(EmailConfig, EmailConfigAdmin)
admin.site.register(FontConfig, FontAdmin)
admin.site.register(ImageManagement, ImageManagementAdmin)
admin.site.register(InsuranceConfig, InsuranceConfigAdmin)
admin.site.register(ConfigPromotionRegister, ConfigPromotionRegisterAdmin)
admin.site.register(EmailReceiveOrder)
