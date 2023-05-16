import traceback

from django.core.management.base import BaseCommand, CommandError

from ...models import Category

class Command(BaseCommand):

    args = ''
    help = 'init data'

    def handle(self, *args, **options):
        """Hook for management command"""
        try:
            cat1 = Category.objects.create(name="Gọng kính")
            Category.objects.create(name="Gọng nhựa", parent=cat1)
            Category.objects.create(name="Gọng kim loại", parent=cat1)
            Category.objects.create(name="Gọng titanium", parent=cat1)
            cat2 = Category.objects.create(name="Tròng kính")
            Category.objects.create(name="Tròng kính Essilor", parent=cat2)
            Category.objects.create(name="Tròng kính Chemi", parent=cat2)
            Category.objects.create(name="Tròng kính Hoga", parent=cat2)
            Category.objects.create(name="Tròng kính Kodak", parent=cat2)
            Category.objects.create(name="Tròng kính hàn quốc phổ thông", parent=cat2)
            cat3 = Category.objects.create(name="Kính thời trang")
            Category.objects.create(name="Kính nam", parent=cat3)
            Category.objects.create(name="Kính nữ", parent=cat3)
            Category.objects.create(name="Kính trẻ em", parent=cat3)
            cat4 = Category.objects.create(name="Phụ kiện mắt kính")
            Category.objects.create(name="Hộp kính", parent=cat4)
            Category.objects.create(name="Nước rửa kính + khăn lau kính", parent=cat4)
            Category.objects.create(name="Nano chống hơi nước cho kính", parent=cat4)
            Category.objects.create(name="Dây đeo giữ kính", parent=cat4)
            Category.objects.create(name="Dán đệm mũi chống tụt kính", parent=cat4)

        except Exception as exc:
            traceback.print_exc()
            raise CommandError("Error. Caught exception {}, command failed".format(str(exc)))