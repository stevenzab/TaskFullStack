from django.contrib.gis.db import models

class Bridge(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    inspection_date = models.DateField()
    status = models.CharField(max_length=50)
    traffic_load = models.IntegerField()

    def __str__(self):
        return self.name
