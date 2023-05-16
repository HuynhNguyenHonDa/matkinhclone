from django.urls import path

from .views import (
    AllCategoryTreeView,
    CategoryTreeView,
    SubCategoryTreeView,
    ProductListAPIView,
    ProductRetrieveAPIView,
    OrderAPIView,
    OrderAPIViewNoToken,
    GenderListAPIView,
    FormFaceListAPIView,
    GlassesMaterialListAPIView,
    GlassesShapeListAPIView,
    BlogsListAPIView,
    BlogRetrieveAPIView
)

urlpatterns = [
    path('subcategory/', SubCategoryTreeView.as_view(), name="get-subcategory"),
    path('category/', CategoryTreeView.as_view(), name="get-category"),
    path('treecategory/', AllCategoryTreeView.as_view(), name="get-tree-category"),
    path('product/', ProductListAPIView.as_view(), name="get-product"),
    path('product/<pk>', ProductRetrieveAPIView.as_view(), name="get-product-detail"),
    path('order/', OrderAPIView.as_view(), name="order-product"),
    path('order-no-token/', OrderAPIViewNoToken.as_view(), name="order-product-w/o-token"),
    path('gender/', GenderListAPIView.as_view(), name="gender"),
    path('form-face/', FormFaceListAPIView.as_view(), name="form-face"),
    path('glass-material/', GlassesMaterialListAPIView.as_view(), name="glass-material"),
    path('glass-shape/', GlassesShapeListAPIView.as_view(), name="glass-shape"),
    path('blogs/', BlogsListAPIView.as_view(), name="get-all-blogs"),
    path('blogs/<slug:slug>/', BlogRetrieveAPIView.as_view(), name="blog-detail"),

]
