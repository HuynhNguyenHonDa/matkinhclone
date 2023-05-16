from django.db import models


class Contact(models.Model):

    nameshop = models.CharField(max_length=512)
    address = models.CharField(max_length=512)
    Phone = models.CharField(max_length=512)
    facebook = models.CharField(max_length=512)
    shopee_id = models.CharField(max_length=512)
    lazada_ip = models.CharField(max_length=512)
    image = models.ImageField(upload_to='store/images', default='store/images/default.png')
    google_map_url = models.CharField(max_length=512, default="")
    recommend_glass_description = models.TextField(default="")

    def __str__(self) -> str:
        return "Contact"
    

class EmailConfig(models.Model):
    email = models.EmailField(blank=True, null=True)
    app_password = models.CharField(max_length=512, blank=True, null=True)


class ImageManagement(models.Model):

    inform_backgroud = models.ImageField(upload_to='store/images', default='store/images/default.png')
    promotion_background = models.ImageField(upload_to='store/images', default='store/images/default.png')
    bestseller_background = models.ImageField(upload_to='store/images', default='store/images/default.png')
    recommend_glass_image = models.ImageField(upload_to='store/images', default='store/images/default.png')


class MainBackgroundImage(models.Model):

    image = models.ImageField(upload_to='store/images', default='store/images/default.png')
    image_management = models.ForeignKey(ImageManagement, on_delete=models.CASCADE, blank=True, null=True, related_name = 'image_management')

class InsuranceConfig(models.Model):
    title = models.CharField(max_length=1024)
    description = models.CharField(max_length=1024)

    def __str__(self) -> str:
        return f"{self.title}"


class ConfigPromotionRegister(models.Model):
    title = models.CharField(max_length=512)
    descripton = models.TextField()
    image = models.ImageField(upload_to='store/images', default='store/images/default.png')

    def __str__(self) -> str:
        return f"{self.title}"
    

class EmailReceiveOrder(models.Model):

    email = models.EmailField()


class FontConfig(models.Model):

    class FONT_CHOICES(models.TextChoices):

        Arial = "Arial", "Arial"
        Verdana = "Verdana", "Verdana"
        Tahoma= "Tahoma", "Tahoma"
        Trebuchet_MS = "Trebuchet MS", "Trebuchet MS"
        Times_New_Roman = "Times New Roman", "Times New Roman"
        Georgia = "Georgia", "Georgia"
        Garamond = "Garamond", "Garamond"
        Courier_New = "Courier New", "Courier New"
        Brush_Script_MT = "Brush Script MT", "Brush Script MT"

    font = models.CharField(max_length=20, choices=FONT_CHOICES.choices, default=FONT_CHOICES.Arial)

    def __str__(self) -> str:
        return "Font Config"
