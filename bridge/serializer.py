from rest_framework import serializers
from .models import Bridge

class BridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bridge
        fields = ['id', 'name', 'location', 'inspection_date', 'status', 'traffic_load']