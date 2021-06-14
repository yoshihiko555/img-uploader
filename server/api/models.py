from django.db import models
import os

def upload_image (instance, filename):
    return 'images/{0}/'.format(filename)
    
class UploadFile (models.Model):
    file = models.ImageField('画像ファイル', upload_to=upload_image)

    def __str__ (self):
        return self.file.url
    
    @property
    def filename (self):
        return os.path.basename(self.file.name)