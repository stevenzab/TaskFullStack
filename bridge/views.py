from django.shortcuts import render
from django.http import JsonResponse
from .models import Bridges
from .serializer import BridgeSerializer

#get all the bridge
#serialize them
#return json

def bridge_list(request):
    bridge = Bridges.objects.all()
    serializer = BridgeSerializer(bridge, many=True)
    return JsonResponse(serializer.data, safe=False)