from django.contrib import admin
from django.contrib.auth.models import User as AuthUser, Group

from .models import User, RegisterReceiveNews

admin.site.register(User)
admin.site.register(RegisterReceiveNews)
admin.site.unregister(AuthUser)
admin.site.unregister(Group)
