from rest_framework import serializers

from drf_spectacular.utils import extend_schema_serializer

from .models import Contact, ImageManagement, InsuranceConfig, MainBackgroundImage, ConfigPromotionRegister, FontConfig

@extend_schema_serializer(
    exclude_fields=(
        'id',
    )
)
class ContactSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = Contact
        fields = '__all__'

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)

    def to_representation(self, instance):

        data = super().to_representation(instance)
        data.pop('id')
        return data


class MainBackgroundImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = MainBackgroundImage
        exclude = ('id', 'image_management', )

    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


@extend_schema_serializer(
    exclude_fields=(
        'id',
    )
)
class ImageManagementSerializer(serializers.ModelSerializer):
    inform_backgroud = serializers.SerializerMethodField('get_inform_backgroud')
    promotion_background = serializers.SerializerMethodField('get_promotion_background')
    bestseller_background = serializers.SerializerMethodField('get_bestseller_background')

    class Meta:
        model = ImageManagement
        fields = '__all__'

    def get_inform_backgroud(self, obj):
        return self.context['request'].build_absolute_uri(obj.inform_backgroud.url)

    def get_promotion_background(self, obj):
        return self.context['request'].build_absolute_uri(obj.promotion_background.url)

    def get_bestseller_background(self, obj):
        return self.context['request'].build_absolute_uri(obj.bestseller_background.url)

    def to_representation(self, instance):

        data = super().to_representation(instance)
        data.pop('id')
        main_background = instance.image_management.all()
        main_background = MainBackgroundImageSerializer(main_background, many=True, context = {"request": self.context['request']})
        data["main_background"] = main_background.data
        return data


class InsuranceConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = InsuranceConfig
        fields = '__all__'
    
    def to_representation(self, instance):

        data = super().to_representation(instance)
        return data


@extend_schema_serializer(
    exclude_fields=(
        'id',
    )
)
class ConfigPromotionRegisterSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_image')

    class Meta:
        model = ConfigPromotionRegister
        fields = '__all__'

    def to_representation(self, instance):

        data = super().to_representation(instance)
        data.pop('id')
        return data
    
    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


@extend_schema_serializer(
    exclude_fields=(
        'id',
    )
)
class FontConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = FontConfig
        fields = '__all__'

    def to_representation(self, instance):

        data = super().to_representation(instance)
        data.pop('id')
        return data
