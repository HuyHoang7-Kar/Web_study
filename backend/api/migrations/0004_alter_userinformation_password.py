# Generated by Django 5.1.7 on 2025-03-18 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_userinformation_last_login_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinformation',
            name='password',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
