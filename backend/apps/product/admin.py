from django import forms
from django.contrib import admin
from django.utils.html import format_html
from django.contrib.admin.widgets import FilteredSelectMultiple

from mptt.admin import MPTTModelAdmin
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import (
    Category,
    Product,
    Corlor,
    Gender,
    FormFace,
    GlassesShape,
    GlassesMaterial,
    Blog,
    ProductImage
)


class ProductForm(forms.ModelForm):
    gender = forms.ModelMultipleChoiceField(
        widget=admin.widgets.FilteredSelectMultiple(
            Gender, 
            False
        ),
        queryset = Gender.objects.all(),
        required=False
    )
    form_face = forms.ModelMultipleChoiceField(
        widget=admin.widgets.FilteredSelectMultiple(
            FormFace, 
            False
        ),
        queryset = FormFace.objects.all(),
        required=False
    )
    glasses_shape = forms.ModelMultipleChoiceField(
        widget=admin.widgets.FilteredSelectMultiple(
            GlassesShape, 
            False
        ),
        queryset = GlassesShape.objects.all(),
        required=False
    )
    glasses_material = forms.ModelMultipleChoiceField(
        widget=admin.widgets.FilteredSelectMultiple(
            GlassesMaterial, 
            False
        ),
        queryset = GlassesMaterial.objects.all(),
        required=False
    )
    content = forms.CharField(widget=CKEditorUploadingWidget())


class ProductBestSellerForm(forms.ModelForm):
    products = forms.ModelMultipleChoiceField(
        widget=admin.widgets.FilteredSelectMultiple(
            Product, 
            False
        ),
        queryset = Product.objects.all(),
        required=False
    )


class ProductImageInline(admin.TabularInline):

    model = ProductImage


class ProductColorInline(admin.TabularInline):
    model = Product.colors.through
    extra = 1


class ProductAdmin(admin.ModelAdmin):

    form = ProductForm
    inlines = (ProductColorInline, ProductImageInline, )


class CategoryAdmin(MPTTModelAdmin):

    list_display = ('name', 'category_image')

    def category_image(self, obj):
        img_url = obj.image.url
        return format_html(f'<img width="50px" src="{img_url}"/>')


class BlogForm(forms.ModelForm):

    body = forms.CharField(widget=CKEditorUploadingWidget())


class BlogAdmin(admin.ModelAdmin):
    form = BlogForm
    list_display = [
        'title',
        'slug',
        'author_display',
        'created_at',
        'thumbnail_image',
    ]
    exclude = ['slug', 'created_at', ]

    def thumbnail_image(self, obj):
        if obj.thumbnail and obj.thumbnail.url:
            return format_html('<img width="75px" src="{}" />'.format(obj.thumbnail.url))
        return ''


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Corlor)
admin.site.register(Gender)
admin.site.register(FormFace)
admin.site.register(GlassesShape)
admin.site.register(GlassesMaterial)
admin.site.register(Blog, BlogAdmin)
