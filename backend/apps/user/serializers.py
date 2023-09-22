from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import User, RegisterReceiveNews

class UserRegisterSerializer(serializers.ModelSerializer):
    default_error_messages = {'email_exists': 'The email already exists'}

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        validated_attrs = super().validate(attrs)
        errors = {}

        if (
            self.instance
            and 'email' in validated_attrs  # if name is in the attributes
            and self.instance.email != validated_attrs['name']  # if the name is updated
        ):
            if (
                User.objects.filter(email=validated_attrs['email'])
                .exclude(id=self.instance.id)
                .exists()
            ):
                errors['email'] = self.error_messages['email_exists']

        if errors:
            raise ValidationError(errors)

        return validated_attrs


class UserLoginSerializer(serializers.Serializer):

    email = serializers.CharField()
    password = serializers.CharField()



class PasswordField(serializers.CharField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("style", {})

        kwargs["style"]["input_type"] = "password"
        kwargs["write_only"] = True

        super().__init__(*args, **kwargs)


class CustomTokenObtainPairSerializer(serializers.Serializer):
    """Customizes JWT default Serializer to add more information about user"""

    email = serializers.CharField()
    password = PasswordField()

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(token)
        token['firstname'] = user.firstname
        token['email'] = user.email

        return token

    def validate(self, attrs):
        # data = super().validate(attrs)
        print(attrs)

        refresh = self.get_token(self.user)

        # data["refresh"] = str(refresh)
        # data["access"] = str(refresh.access_token)

        return attrs


class RegisterReceiveNewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = RegisterReceiveNews
        fields = '__all__'
