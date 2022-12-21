# Generated by Django 4.0.6 on 2022-07-30 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_awesome_api', '0002_post_delete_person_delete_species'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='content',
        ),
        migrations.RemoveField(
            model_name='post',
            name='title',
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(upload_to='post_images/'),
        ),
    ]
