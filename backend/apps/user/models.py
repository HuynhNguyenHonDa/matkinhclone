from django.db import models
from django.conf import settings

from datetime import datetime, timedelta
import jwt


class User(models.Model):

    lastname = models.CharField(max_length=250)
    firstname = models.CharField(max_length=250)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return f"{self.lastname} {self.firstname}"

    def is_authenticated(self):
        return True

    def get_access_token(self):
        data = {
            'id': self.id,
            'expire_time': (datetime.utcnow() + timedelta(hours=4)).strftime(settings.STRPTIME_FORMAT),
            'create_at': (datetime.utcnow()).strftime(settings.STRPTIME_FORMAT)
        }
        try:
            secret_key = settings.SECRET_KEY
            encoded_jwt = jwt.encode(
                data,
                secret_key,
                algorithm="HS256"
            )
            return encoded_jwt
        except jwt.exceptions.ExpiredSignatureError as e:
            pass


class RegisterReceiveNews(models.Model):

    name = models.CharField(max_length=512)
    email = models.EmailField()
    phonenumber = models.CharField(max_length=20)
    note = models.CharField(max_length=1024, blank=True, null=True)

    def __str__(self):
        return f"{self.name}--{self.email}--{self.phonenumber}"
        