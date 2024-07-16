from rest_framework import serializers
from .models import Bridges

class BridgeSerializer(serializers.ModelSerializer):
    location_json = serializers.JSONField()

    class Meta:
        model = Bridges
        fields = ['id', 'name', 'location', 'location_json', 'inspection_date', 'status', 'traffic_load']