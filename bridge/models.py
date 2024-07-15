from django.contrib.gis.db import models

class Bridges(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField(geography=True, blank=True, null=True)
    inspection_date = models.DateField()
    status = models.CharField(max_length=50)
    traffic_load = models.IntegerField()

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'bridges'
