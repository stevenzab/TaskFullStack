from django.http import JsonResponse
from .models import Bridges
from .serializer import BridgeSerializer , BridgeInputSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.gis.geos import Point
from django.db.models import Count

@api_view(['GET'])
def bridge_status_distribution(request):
    status_counts = Bridges.objects.values('status').annotate(count=Count('status'))
    total = sum(item['count'] for item in status_counts)
    percentages = [
        {'status': item['status'], 'percentage': (item['count'] / total) * 100}
        for item in status_counts
    ]
    return Response(percentages)

@api_view(["GET"])
def bridge_list(request):
    bridges = Bridges.objects.all()
    bridge_list = []
    for bridge in bridges:
        data = {
            'id': bridge.id,
            'name': bridge.name,
            'inspection_date': bridge.inspection_date,
            'status': bridge.status,
            'traffic_load': bridge.traffic_load,
            'latitude': bridge.location.y if bridge.location else None,
            'longitude': bridge.location.x if bridge.location else None
        }
        bridge_list.append(data)
    return JsonResponse({'bridges': bridge_list}, status=status.HTTP_200_OK)

@api_view(["GET"])
def bridge_details(request, id):
    try:
        bridge = Bridges.objects.get(pk=id)
        data = {
            'id': bridge.id,
            'name': bridge.name,
            'inspection_date': bridge.inspection_date,
            'status': bridge.status,
            'traffic_load': bridge.traffic_load,
            'latitude': bridge.location.y if bridge.location else None,
            'longitude': bridge.location.x if bridge.location else None
        }
        return Response(data, status=status.HTTP_200_OK)
    except Bridges.DoesNotExist:
        return Response({'error': 'Bridge not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
def update_bridge(request, id):
    try:
        bridge = Bridges.objects.get(pk=id)
    except Bridges.DoesNotExist:
        return Response({'error': 'Bridge not found'}, status=status.HTTP_404_NOT_FOUND)
    
    input_serializer = BridgeInputSerializer(data=request.data)
    if input_serializer.is_valid():
        latitude = input_serializer.validated_data.pop('latitude')
        longitude = input_serializer.validated_data.pop('longitude')
        location = Point(longitude, latitude)

        bridge.name = input_serializer.validated_data['name']
        bridge.inspection_date = input_serializer.validated_data['inspection_date']
        bridge.status = input_serializer.validated_data['status']
        bridge.traffic_load = input_serializer.validated_data['traffic_load']
        bridge.location = location
        bridge.save()

        output_serializer = BridgeSerializer(bridge)
        return Response(output_serializer.data, status=status.HTTP_200_OK)
    return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def create_bridge(request):
    input_serializer = BridgeInputSerializer(data=request.data)
    if input_serializer.is_valid():
        bridge = input_serializer.save()
        output_serializer = BridgeSerializer(bridge)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
    return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_bridge(request, id):
    bridge = Bridges.objects.get(pk=id)
    bridge.delete()
    return Response(status=status.HTTP_200_OK)