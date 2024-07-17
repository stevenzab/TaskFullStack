from django.contrib.gis.db import models
from rest_framework import serializers
from django.contrib.gis.geos import Point

class Bridges(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField(geography=True, srid=4326)
    inspection_date = models.DateField()
    status = models.CharField(max_length=50)
    traffic_load = models.IntegerField()

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'bridges'

class BridgeInput(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    inspection_date = serializers.DateField()
    status = serializers.CharField(max_length=50)
    traffic_load = serializers.IntegerField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    def create(self, validated_data):
        latitude = validated_data.pop('latitude')
        longitude = validated_data.pop('longitude')
        location = Point(longitude, latitude)

        bridge = Bridges.objects.create(location=location, **validated_data)
        return bridge
