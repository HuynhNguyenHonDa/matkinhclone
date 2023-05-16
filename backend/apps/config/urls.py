from django.urls import path

from .views  import ContactAPIView, ImageManagementAPIView, InsuranceConfigAPIView, ConfigPromotionRegisterAPIView, FontConfigAPIView

urlpatterns = [
    path('config-contact/', ContactAPIView.as_view(), name="get-config-contact"),
    path('config-image/', ImageManagementAPIView.as_view(), name="get-config-image"),
    path('config-insurance/', InsuranceConfigAPIView.as_view(), name="get-config-insurance"),
    path('config-promotion-register/', ConfigPromotionRegisterAPIView.as_view(), name="config-promotion-register"),
    path('config-font/', FontConfigAPIView.as_view(), name="config-font"),
]