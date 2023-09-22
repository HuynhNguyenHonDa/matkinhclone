from typing import TypedDict

from django.conf import settings
from django.core.mail import send_mail


class EmailUtils(object):
    def send_order_email(self, receiver_info: dict):
        subject = 'Email thông báo mua hàng'
        message = f'Hi {receiver_info.get("name", "khách hàng")}, HPNY 2023'
        email_from = settings.EMAIL_SENDER_NAME
        recipient_list = [receiver_info.get("email") ]
        send_mail(subject, message, email_from, recipient_list )
