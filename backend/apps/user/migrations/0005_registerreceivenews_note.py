# Generated by Django 3.2 on 2023-03-27 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_delete_news'),
    ]

    operations = [
        migrations.AddField(
            model_name='registerreceivenews',
            name='note',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
    ]
