# Generated by Django 3.2 on 2023-02-26 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0002_init_config_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('app_password', models.CharField(blank=True, max_length=512, null=True)),
            ],
        ),
    ]
