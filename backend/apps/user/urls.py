from django.urls import path

from .views import UserRegisterView, UserLoginView, RegisterReceiveNewsCreateAPIView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('register-receive-news/', RegisterReceiveNewsCreateAPIView.as_view(), name='register-receive-news'),
]