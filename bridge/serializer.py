import json
from rest_framework import serializers
from .models import BridgeInput, Bridges
from django.contrib.gis.geos import Point
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class BridgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bridges
        fields = '__all__'
        
class BridgeInputSerializer(serializers.Serializer):
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