from django.urls import path

from .views import CustomerGratitudeAPIView


urlpatterns = [
   path('services-customer-gratitude/', CustomerGratitudeAPIView.as_view(), name="get-services-customer-gratitude"),
]
