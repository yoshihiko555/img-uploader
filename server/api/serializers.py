from rest_framework import serializers
from .models import *

class UploadFileSerializer (serializers.ModelSerializer):
    file = serializers.ImageField()
    file_name = serializers.SerializerMethodField()

    class Meta:
        model = UploadFile
        fields = '__all__'

    def get_file_name (self, obj):
        return obj.filename