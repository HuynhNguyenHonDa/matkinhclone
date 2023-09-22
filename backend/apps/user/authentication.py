from django.conf import settings

from rest_framework import authentication
from rest_framework import exceptions

from drf_spectacular.extensions import OpenApiAuthenticationExtension

import jwt
from datetime import datetime

from .models import User

class CustomerAuthentication(authentication.BaseAuthentication):
    AUTH_HEADER_TYPES = 'Bearer'

    def authenticate(self, request):
        token_input = request.META.get('HTTP_AUTHORIZATION') or ""
        if not token_input.split():
            return None
        auth_header_type_is_valid = bool(str(token_input.split()[0]) == self.AUTH_HEADER_TYPES)
        if not auth_header_type_is_valid:
            return None
        token = token_input.split()[-1]
        if not token:
            return None

        try:
            token_payload = jwt.decode(
                jwt=token,
                key=settings.SECRET_KEY,
                algorithms=['HS256'],
            )
            expire_time = token_payload.get("expire_time")
            expire_time = datetime.strptime(expire_time, settings.STRPTIME_FORMAT)
            if not expire_time or datetime.utcnow() >= expire_time:
                raise exceptions.AuthenticationFailed('Token expired')
            id = token_payload.get("id")
            user = User.objects.filter(id=id).first()
            if not user:
                raise exceptions.AuthenticationFailed('Invalid token')
            return (user, None)

        except (
            jwt.exceptions.DecodeError,
            jwt.exceptions.ExpiredSignatureError,
            jwt.exceptions.InvalidSignatureError,
        ) as e:
            raise exceptions.AuthenticationFailed('Invalid token')


class BearerTokenAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = CustomerAuthentication
    name = 'BearerTokenAuthentication'

    def get_security_definition(self, auto_schema):
        return {
            "type": "http",
            "in": "header",
            "scheme": "bearer",
            "name": "Authorization",
            "description": "JWT authentication with format: `Bearer <token>`",
        }
