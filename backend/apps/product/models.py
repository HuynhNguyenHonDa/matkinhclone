from django.db import models
from django.template.defaultfilters import slugify

from mptt.models import MPTTModel, TreeForeignKey
from ckeditor_uploader.fields import RichTextUploadingField
from colorfield.fields import ColorField
from django_resized import ResizedImageField


TEXT_NORMALIZING_MAP= {
    'À': 'A',
    'Á': 'A',
    'Â': 'A',
    'Ã': 'A',
    'Ä': 'A',
    'È': 'E',
    'É': 'E',
    'Ê': 'E',
    'Ë': 'E',
    'Í': 'I',
    'Ì': 'I',
    'Î': 'I',
    'Ï': 'I',
    'Ù': 'U',
    'Ú': 'U',
    'Û': 'U',
    'Ü': 'U',
    'Ò': 'O',
    'Ó': 'O',
    'Ô': 'O',
    'Õ': 'O',
    'Ö': 'O',
    'Ñ': 'N',
    'Ç': 'C',
    'ª': 'A',
    'º': 'O',
    '§': 'S',
    '³': '3',
    '²': '2',
    '¹': '1',
    'à': 'a',
    'á': 'a',
    'â': 'a',
    'ã': 'a',
    'ä': 'a',
    'è': 'e',
    'é': 'e',
    'ê': 'e',
    'ë': 'e',
    'í': 'i',
    'ì': 'i',
    'î': 'i',
    'ï': 'i',
    'ù': 'u',
    'ú': 'u',
    'û': 'u',
    'ü': 'u',
    'ò': 'o',
    'ó': 'o',
    'ô': 'o',
    'õ': 'o',
    'ö': 'o',
    'ñ': 'n',
    'ç': 'c',
    'Đ': 'd',
    'đ': 'd'
}


def normalize_text(text):
    list_text = list(text)
    for index, i in enumerate(list_text):
        val = TEXT_NORMALIZING_MAP.get(i)
        if(val):
            list_text[index] = val
    return "".join(list_text)



class Category(MPTTModel):
    name = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    image = models.ImageField(upload_to='store/images', default='store/images/default.png')

    def __str__(self):
        return self.name

class Corlor(models.Model):
    name = models.CharField(max_length=20)
    code = ColorField(default='#FF0000')

    def __str__(seft):
        return seft.name


class Gender(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='gender/images', default='store/images/default.png')

    def __str__(seft):
        return seft.name


class FormFace(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='form_face/images', default='store/images/default.png')
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE, blank=True, null=True)  

    def __str__(seft):
        return seft.name


class GlassesShape(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='glasses_shape/images', default='store/images/default.png')

    def __str__(seft):
        return seft.name


class GlassesMaterial(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='glasses_material/images', default='store/images/default.png')

    def __str__(seft):
        return seft.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    name = models.CharField(max_length=250)
    price = models.FloatField(default=0.0)
    origin_price = models.FloatField(default=0.0)
    thumbnail = models.ImageField(upload_to='store/images', default='store/images/default.png')
    content = RichTextUploadingField(blank=True, null=True)
    no_of_order = models.PositiveIntegerField(default=1)
    colors = models.ManyToManyField(Corlor, through='ProductColor')
    gender = models.ManyToManyField(Gender, related_name='product_gender')
    form_face = models.ManyToManyField(FormFace, related_name='product_form_face')
    glasses_shape = models.ManyToManyField(GlassesShape, related_name='product_glasses_shape')
    glasses_material = models.ManyToManyField(GlassesMaterial, related_name='product_glasses_material')

    def __str__(self):
        return self.name


class ProductImage(models.Model):

    image = models.ImageField(upload_to='store/images', default='store/images/default.png')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class ProductColor(models.Model):

    color = models.ForeignKey(Corlor, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    class Meta:
        unique_together = ('color', 'product')

    def __str__(self):
        return f"{self.product.id}.{self.product.name}-{self.color}-{self.quantity}"


class Blog(models.Model):
    title = models.CharField(max_length=255)
    thumbnail = ResizedImageField(
        size=[640, 480],
        quality=75,
        upload_to='blog/%Y/%m/%d'
    )
    author_display = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    preview_body = models.CharField(max_length=511)
    created_at = models.DateTimeField(auto_now_add=True)
    body = RichTextUploadingField()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(normalize_text(self.title)) + "-" + str(self.id)
            self.save()

    def __str__(self):
        return self.slug

