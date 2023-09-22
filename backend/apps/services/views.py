from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from drf_spectacular.utils import (
    extend_schema,
)

from .models import CustomerGratitude
from .serializers import CustomerGratitudeSerializer


class CustomerGratitudeAPIView(APIView):
    serializer_class = CustomerGratitudeSerializer

    @extend_schema(
        tags=["Services"],
        description='Get CustomerGratitude',
    )
    def get(self, request, *args, **kwargs):
        customer_gratitude = CustomerGratitude.objects.all().first()
        serializer = self.serializer_class(customer_gratitude)

        return Response(serializer.data, status=status.HTTP_200_OK)
