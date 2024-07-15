from django.shortcuts import render
from django.http import JsonResponse
from .models import Bridges
from .serializer import BridgeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

#get all the bridge
#serialize them
#return json

@api_view(["GET"])
def bridge_list(request):
    bridge = Bridges.objects.all()
    serializer = BridgeSerializer(bridge, many=True)
    return JsonResponse({'bridge': serializer.data}, safe=False)

@api_view(["GET"])
def bridge_details(request, id):
    bridge = Bridges.objects.get(pk=id)
    serialize = BridgeSerializer(bridge)
    return Response(serialize.data)

@api_view(["PUT"])
def update_bridge(request, id):
    bridge = Bridges.objects.get(pk=id)
    serialize = BridgeSerializer(bridge, data=request.data)
    if serialize.is_valid():
        serialize.save()
        return Response(serialize.data)
    return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def create_bridge(request):
    serialize = BridgeSerializer(data=request.data)
    if serialize.is_valid():
        serialize.save()
        return Response(serialize.data, status.HTTP_201_CREATED)
    return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_bridge(request, id):
    bridge = Bridges.objects.get(pk=id)
    bridge.delete()
    return Response(status=status.HTTP_200_OK)