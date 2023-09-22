from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Contact, ImageManagement, InsuranceConfig, ConfigPromotionRegister, FontConfig
from .serializers import ContactSerializer, ImageManagementSerializer, InsuranceConfigSerializer, ConfigPromotionRegisterSerializer, FontConfigSerializer

from drf_spectacular.utils import (
    extend_schema
)


@extend_schema(
    tags=["Config"],
)
class ContactAPIView(APIView):

    def get(self, request):
        queryset = Contact.objects.first()
        serializer = ContactSerializer(queryset, context = {"request": request})
        return Response(serializer.data)
    

@extend_schema(
    tags=["Config"],
)
class ImageManagementAPIView(APIView):

    def get(self, request):
        queryset = ImageManagement.objects.first()
        serializer = ImageManagementSerializer(queryset, context = {"request": request})
        return Response(serializer.data)


@extend_schema(
    tags=["Config"],
)
class InsuranceConfigAPIView(ListAPIView):

    queryset = InsuranceConfig.objects.all()
    serializer_class = InsuranceConfigSerializer


class ConfigPromotionRegisterAPIView(APIView):
    serializer_class = ConfigPromotionRegisterSerializer

    @extend_schema(
        tags=["Config"],
        description='Get News',
    )
    def get(self, request, *args, **kwargs):
        new = ConfigPromotionRegister.objects.all().first()
        serializer = self.serializer_class(new, context = {"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(
    tags=["Config"],
)
class FontConfigAPIView(APIView):
    serializer_class = FontConfigSerializer

    @extend_schema(
        tags=["Config"],
        description='Get Font Config',
    )
    def get(self, request, *args, **kwargs):
        new = FontConfig.objects.all().first()
        serializer = self.serializer_class(new)

        return Response(serializer.data, status=status.HTTP_200_OK)
