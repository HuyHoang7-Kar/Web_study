# Generated by Django 5.1.7 on 2025-03-18 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_userinformation_managers_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinformation',
            name='last_login',
        ),
        migrations.AlterField(
            model_name='userinformation',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterModelTable(
            name='otp',
            table=None,
        ),
    ]
