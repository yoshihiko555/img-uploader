from django.shortcuts import render
from rest_framework import status, generics, permissions
from .models import *
from .serializers import *

# Create your views here.

class ImageFileView (generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = UploadFile.objects.all()
    serializer_class = UploadFileSerializer
