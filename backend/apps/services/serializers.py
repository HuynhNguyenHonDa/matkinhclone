from rest_framework import serializers

from drf_spectacular.utils import extend_schema_serializer

from .models import CustomerGratitude


@extend_schema_serializer(
    exclude_fields=(
        'id',
    )
)
class CustomerGratitudeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerGratitude
        fields = '__all__'

    def to_representation(self, instance):

        data = super().to_representation(instance)
        data.pop('id')
        return data
