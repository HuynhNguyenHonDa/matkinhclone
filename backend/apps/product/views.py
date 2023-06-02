from django.conf import settings
from django.core.mail import EmailMessage
from django.core.mail.backends.smtp import EmailBackend
from django.template.loader import get_template

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiParameter
)

from apps.config.models import EmailConfig, EmailReceiveOrder

from .models import (
    Category,
    Product,
    ProductColor,
    Gender,
    FormFace,
    GlassesShape,
    GlassesMaterial,
    Blog,
)
from .filters import ProductFilter, FormFaceFilter
from .serializers import (
    CategorySerializer,
    AllCategorySerializer,
    ProductDetailSerializer,
    ProductOrderSerializer,
    ProductSerializer,
    GenderSerializer,
    FormFaceSerializer,
    GlassesMaterialSerializer,
    GlassesShapeSerializer,
    BlogsSerializer,
    BlogRetrieveAPISerializer,
    OrderSerializer,
)


class SubCategoryTreeView(APIView):
    serializer_class = CategorySerializer

    @extend_schema(
        tags=["Product",],
        description="Get all SubCategory",
        examples=[
            OpenApiExample(
                "Category Response",
                value=[
                    {
                        "name": "Gọng nhựa",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Gọng kim loại",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Gọng titanium",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Tròng kính  Essilor",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Tròng kính chemi",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Tròng kính hoga",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Tròng kính kodak",
                        "image": "/media/store/images/default.png"
                    },
                    {
                        "name": "Tròng kính hàn quốc phổ thông",
                        "image": "/media/store/images/default.png"
                    }
                ]
            )
        ],
    )
    def get(self, request, *args, **kwargs):
        categories = Category.objects.exclude(parent=None)
        dict_category = [{
            "name": c.name,
            "image": request.build_absolute_uri(c.image.url)
        } for c in categories]
        serializer = CategorySerializer(data=dict_category, many=True)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryTreeView(APIView):
    serializer_class = CategorySerializer

    @extend_schema(
        tags=["Product",],
        description="Get all Parent Category",
    )
    def get(self, request, *args, **kwargs):
        categories = Category.objects.filter(parent=None)
        dict_category = [{
            "id": c.id,
            "name": c.name,
            "image": request.build_absolute_uri(c.image.url)
        } for c in categories]
        serializer = CategorySerializer(data=dict_category, many=True)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(
        tags=["Product",],
        description="Get all Tree Category",
    )
class AllCategoryTreeView(ListAPIView):
    serializer_class = AllCategorySerializer
    queryset = Category.objects.filter(parent=None).prefetch_related("children").all()


@extend_schema(
    tags=["Product",],
    examples=[
        OpenApiExample(
            "Products Response",
            value=[
                {
                    "id": 1,
                    "category": "Gọng nhựa",
                    "image": "http://localhost:8000/media/store/images/city_aerial_view_buildings_198242_3840x2160.jpg",
                    "colors": [
                        {
                            "label": "Vàng",
                            "code": "#FF0000",
                            "quantity": 10
                        },
                        {
                            "label": "Đen",
                            "code": "#FF0000",
                            "quantity": 1000
                        },
                        {
                            "label": "Tím",
                            "code": "#DCB1FF",
                            "quantity": 1
                        }
                    ],
                    "name": "awd",
                    "price": 0.0234,
                    "content": "<p>awdawdawd<img alt=\"\" src=\"/media/uploads/2023/01/08/california-beach-sunset-wallpaper.jpg\" /></p>",
                    "no_of_order": 1,
                    "gender": [
                        {
                            "id": 2,
                            "name": "nu"
                        }
                    ],
                    "form_face": [],
                    "glasses_shape": [],
                    "glasses_material": [
                        {
                            "id": 2,
                            "name": "sat"
                        }
                    ]
                }
            ]
        )
    ],
)
class ProductListAPIView(ListAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        data = response.data.copy()
        for product in data:
            product_color = ProductColor.objects.filter(product__id=product.get("id"))
            colors = []
            for prod in product_color:
                dict_color = dict()
                dict_color["label"] = prod.color.name
                dict_color["code"] = prod.color.code
                dict_color["quantity"] = prod.quantity
                colors.append(dict_color)
            product["colors"] = colors
        response.data = data
        return response


@extend_schema(
    tags=["Product",],
)
class GenderListAPIView(ListAPIView):

    queryset = Gender.objects.all()
    serializer_class = GenderSerializer


@extend_schema(
    tags=["Product",],
)
class FormFaceListAPIView(ListAPIView):

    queryset = FormFace.objects.all()
    serializer_class = FormFaceSerializer
    filterset_class = FormFaceFilter


@extend_schema(
    tags=["Product",],
)
class GlassesMaterialListAPIView(ListAPIView):

    queryset = GlassesMaterial.objects.all()
    serializer_class = GlassesMaterialSerializer


@extend_schema(
    tags=["Product",],
)
class GlassesShapeListAPIView(ListAPIView):

    queryset = GlassesShape.objects.all()
    serializer_class = GlassesShapeSerializer


@extend_schema(
    tags=["Product",],
    examples=[
        OpenApiExample(
            "Products Response",
            value={
                    "id": 1,
                    "category": "Gọng nhựa",
                    "image": "http://localhost:8000/media/store/images/city_aerial_view_buildings_198242_3840x2160.jpg",
                    "colors": [
                        {
                            "label": "Vàng",
                            "code": "#FF0000",
                            "quantity": 10
                        },
                        {
                            "label": "Đen",
                            "code": "#FF0000",
                            "quantity": 1000
                        },
                        {
                            "label": "Tím",
                            "code": "#DCB1FF",
                            "quantity": 1
                        }
                    ],
                    "name": "awd",
                    "price": 0.0234,
                    "content": "<p>awdawdawd<img alt=\"\" src=\"/media/uploads/2023/01/08/california-beach-sunset-wallpaper.jpg\" /></p>"
            }
        )
    ],
)
class ProductRetrieveAPIView(RetrieveAPIView):

    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class OrderAPIView(APIView):

    permission_classes = [IsAuthenticated]

    @extend_schema(
        tags=["Product",],
        request=ProductOrderSerializer,
        description='Need JWT authentication with format: `Bearer <token>` in Header',
        examples=[
            OpenApiExample(
                name='Request body example order API',
                value=[
                    {
                        "name": "product name 1",
                        "price": 10,
                        "quantity": 9,
                        "colors": "đen"
                    },
                    {
                        "name": "product name 1",
                        "price": 100,
                        "quantity": 145,
                        "colors": "hường"
                    }
                ],
                request_only=True,
            )
        ],
    )
    def post(self, request, *args, **kwargs):
        serializer = ProductOrderSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        total = 0
        for product in serializer.data:
            product['amount'] = product['price'] * product['quantity']
            total += product['amount']
        context = {
            'products': serializer.data,
            'total': total,
        }
        email_config = EmailConfig.objects.first()
        if not email_config and not email_config.email and not email_config.app_password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        backend = EmailBackend(
            host=settings.EMAIL_HOST,
            port=settings.EMAIL_PORT,
            password=email_config.app_password,
            username=email_config.email,
            use_tls=True,
            timeout=10)
        message = get_template('user/email_order.html').render(context, request)
        email_admin = EmailReceiveOrder.objects.all()
        mail = EmailMessage(
            subject="Order confirmation",
            body=message,
            to=[
                email_admin,
                request.user.email
            ],
            connection=backend
        )
        mail.content_subtype = "html"
        mail.send()
        return Response(status=status.HTTP_200_OK)


class OrderAPIViewNoToken(APIView):

    @extend_schema(
        tags=["Product",],
        request=OrderSerializer,
        description='NO Need JWT authentication',
        examples=[
            OpenApiExample(
                name='Request body example order API',
                value={
                    "name": "string",
                    "email": "user@example.com",
                    "phonenumber": "string",
                    "address": "string",
                    "products": [
                        {
                            "name": "product name 1",
                            "price": 10,
                            "quantity": 9,
                            "colors": "đen"
                        },
                        {
                            "name": "product name 1",
                            "price": 100,
                            "quantity": 145,
                            "colors": "hường"
                        }
                    ]
                },
                request_only=True,
            )
        ],
    )
    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        total = 0
        for product in serializer.data["products"]:
            product['amount'] = product['price'] * product['quantity']
            total += product['amount']
        context = {
            'user': serializer.data["name"],
            'phonenumber': serializer.data["phonenumber"],
            'products': serializer.data["products"],
            'address': serializer.data["address"],
            'total': total,
        }
        email_config = EmailConfig.objects.first()
        if not email_config and not email_config.email and not email_config.app_password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        backend = EmailBackend(
            host=settings.EMAIL_HOST,
            port=settings.EMAIL_PORT,
            password=email_config.app_password,
            username=email_config.email,
            use_tls=True,
            timeout=10)
        message = get_template('user/email_order_no_token.html').render(context, request)
        # email_admin = EmailReceiveOrder.objects.all()
        email_admin = [x for x in EmailReceiveOrder.objects.all()]
        mail = EmailMessage(
            subject="Order confirmation",
            body=message,
            to=[
                # email_admin,
                *email_admin,
                serializer.data["email"]
            ],
            connection=backend
        )
        mail.content_subtype = "html"
        mail.send()
        return Response(status=status.HTTP_200_OK)


class BlogsListAPIView(ListAPIView):

    queryset = Blog.objects.order_by('-created_at')[:10]
    serializer_class = BlogsSerializer


class BlogRetrieveAPIView(RetrieveAPIView):

    queryset = Blog.objects.all()
    serializer_class = BlogRetrieveAPISerializer
    lookup_field = 'slug'
