from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from .models import (
    Product,
    Corlor,
    Category,
    Gender,
    FormFace,
    GlassesShape,
    GlassesMaterial,
    ProductColor,
    Blog,
    ProductImage
)

class CategorySerializer(serializers.Serializer):

    id = serializers.IntegerField()
    name = serializers.CharField()
    image = serializers.CharField()


class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Corlor
        fields = '__all__'


class ProductColorSerializer(serializers.HyperlinkedModelSerializer):

    label = serializers.ReadOnlyField(source='color.name')
    code = serializers.ReadOnlyField(source='color.code')

    class Meta:
        model = ProductColor

        fields = ('label', 'code', 'quantity', )


class GenderSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = Gender
        fields = '__all__'

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)
    

class FormFaceSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = FormFace
        fields = '__all__'

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = ProductImage
        exclude = ['id', 'product',]

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)

class GlassesShapeSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = GlassesShape
        fields = '__all__'

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class GlassesMaterialSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = GlassesMaterial
        fields = '__all__'

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    images = serializers.SerializerMethodField('get_images')
    colors = ProductColorSerializer(source='productcolor_set', many=True)

    class Meta:

        model = Product
        fields = '__all__'
        depth = 1

    def get_images(self, obj):
        product_images = ProductImage.objects.filter(product=obj)
        return ProductImageSerializer(product_images, many=True, context = {"request": self.context['request']}).data


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    thumbnail = serializers.SerializerMethodField('get_thumbnail')
    colors = ProductColorSerializer(source='productcolor_set', many=True)
    images = serializers.SerializerMethodField('get_images')

    class Meta:

        model = Product
        fields = '__all__'
        depth = 1

    def get_images(self, obj):
        product_images = ProductImage.objects.filter(product=obj)
        return ProductImageSerializer(product_images, many=True, context = {"request": self.context['request']}).data

    def get_thumbnail(self, obj):
        return self.context['request'].build_absolute_uri(obj.thumbnail.url)


class ProductOrderSerializer(serializers.Serializer):
    name = serializers.CharField()
    price = serializers.FloatField()
    quantity = serializers.IntegerField()
    colors = serializers.CharField(required=False)

class OrderSerializer(serializers.Serializer):

    name = serializers.CharField()
    email = serializers.EmailField()
    phonenumber = serializers.CharField()
    address = serializers.CharField(max_length=1024)
    products = ProductOrderSerializer(many=True)


class BlogsSerializer(serializers.ModelSerializer):

    thumbnail = serializers.SerializerMethodField('get_thumbnail')

    class Meta:

        model = Blog
        fields = '__all__'
        depth = 1

    @extend_schema_field(serializers.CharField)
    def get_thumbnail(self, obj):
        return self.context['request'].build_absolute_uri(obj.thumbnail.url)
    

class BlogRetrieveAPISerializer(BlogsSerializer):

    class Meta:

        model = Blog
        fields = '__all__'


class ChildrenCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ['image', 'lft', 'rght', 'tree_id', 'parent', 'level',]


class AllCategorySerializer(serializers.ModelSerializer):
    children = ChildrenCategorySerializer(many=True)

    class Meta:
        model = Category
        exclude = ['image', 'lft', 'rght', 'tree_id', 'parent', 'level',]
