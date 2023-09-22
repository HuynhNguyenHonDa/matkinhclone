from django.contrib.auth.hashers import make_password, check_password

from django.http import JsonResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView

from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    inline_serializer,
    OpenApiResponse
)
from rest_framework import status, serializers

from .models import User, RegisterReceiveNews
from .serializers import UserRegisterSerializer, UserLoginSerializer, RegisterReceiveNewsSerializer


@extend_schema(
    tags=["User",],
    description='Register',
    request=UserRegisterSerializer,
    responses={
        201: inline_serializer(
            name='Response 201 UserRegisterView',
            fields={
                "message": serializers.CharField(default="Register successful!")
            }
        ),
        400: inline_serializer(
            name='Response UserRegisterView',
            fields={
                "email": serializers.ListField(default=["user with this email already exists."])
            }
        ),
    }

)
class UserRegisterView(APIView):

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()

        return JsonResponse({
            'message': 'Register successful!'
        }, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=["User",],
    description='Login',
    request=UserLoginSerializer,
    responses={
        200: inline_serializer(
            name='Response 200 UserLoginView',
            fields={
                "access_token": serializers.CharField(
                    default="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZXhwaXJlX3RpbWUiOiIwMS8wNy8yMDIzLCAxMjo0MTo0NSIsImNyZWF0ZV9hdCI6IjAxLzA3LzIwMjMsIDA4OjQxOjQ1In0.2xA2b5r_1vmEVKKpJO_G8ce49BHmiTU9X3Yza2F__58"
                )
            }
        ),
        400: inline_serializer(
            name='Response 400 UserLoginView',
            fields={
                "error_message": serializers.CharField(
                    default="Email or password is incorrect!"
                )
            }
        ),
    }
)
class UserLoginView(APIView):

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(email=serializer.validated_data['email']).first()
        if user:
            if check_password(serializer.validated_data['password'], user.password):
                data = {
                    'access_token': user.get_access_token()
                }
                return Response(data, status=status.HTTP_200_OK)

        return Response({
            'error_message': 'Email or password is incorrect!',
        }, status=status.HTTP_400_BAD_REQUEST)


class RegisterReceiveNewsCreateAPIView(CreateAPIView):

    queryset = RegisterReceiveNews.objects.all()
    serializer_class = RegisterReceiveNewsSerializer
