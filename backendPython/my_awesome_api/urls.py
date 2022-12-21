from django.urls import path
from . import views

urlpatterns = [
    path('ocr/', views.PostView.as_view(), name='posts_list'),
    path('recommended-events/<slug:id>',
         views.Reccomend.as_view(), name='recomended_events'),
]
