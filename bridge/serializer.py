from rest_framework import serializers
from .models import Bridges

class BridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bridges
        fields = ['id', 'name', 'location', 'inspection_date', 'status', 'traffic_load']