from django.db import router
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path('image/', views.ImageFileView.as_view(), name='images'),
    path('', include(router.urls)),
]
