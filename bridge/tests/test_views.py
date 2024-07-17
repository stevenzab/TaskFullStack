from django.test import SimpleTestCase
from unittest.mock import patch, MagicMock
from django.contrib.gis.geos import Point
from django.urls import reverse
import mock
from rest_framework.test import APIRequestFactory
from rest_framework import status
from bridge.models import Bridges
from bridge.views import bridge_list, bridge_details, update_bridge, create_bridge, delete_bridge, bridge_status_distribution
import json
import datetime
from json import dumps as _dumps

def dumps_wrapper(*args, **kwargs):
    return _dumps(*args, **(kwargs | {"default": lambda obj: "mock"}))

class BridgeListViewTest(SimpleTestCase):
    
    def setUp(self):
        self.factory = APIRequestFactory()

    @patch('bridge.models.Bridges.objects')
    def test_bridge_status_distribution(self, mock_objects):
        mock_objects.values.return_value.annotate.return_value = [
            {'status': 'Good', 'count': 3},
            {'status': 'Bad', 'count': 2},
        ]

        request = self.factory.get('/api/bridge-status-distribution/')
        response = bridge_status_distribution(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [
            {'status': 'Good', 'percentage': 60.0},
            {'status': 'Bad', 'percentage': 40.0},
        ])
    
    @patch('bridge.views.Bridges')
    def test_bridge_list(self, mock_bridges):
        bridge1 = MagicMock(id=1, name='Bridge 1', inspection_date='2023-01-01', status='Good', traffic_load=100)
        bridge1.location.x = 10.0
        bridge1.location.y = 20.0

        bridge2 = MagicMock(id=2, name='Bridge 2', inspection_date='2023-02-01', status='Bad', traffic_load=150)
        bridge2.location.x = 30.0
        bridge2.location.y = 40.0

        mock_bridges.objects.all.return_value = [bridge1, bridge2]

        request = self.factory.get('/api/bridge-list/')
        response = bridge_list(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {
            'bridges': [
                {'id': 1, 'name': 'Bridge 1', 'inspection_date': '2023-01-01', 'status': 'Good', 'traffic_load': 100, 'latitude': 20.0, 'longitude': 10.0},
                {'id': 2, 'name': 'Bridge 2', 'inspection_date': '2023-02-01', 'status': 'Bad', 'traffic_load': 150, 'latitude': 40.0, 'longitude': 30.0},
            ]
        })

    @patch('bridge.views.Bridges.objects')
    @patch('json.dumps')
    def test_bridge_list(self, mock_json_dumps, mock_objects):
        mock_json_dumps.side_effect = dumps_wrapper

        bridge1 = MagicMock(id=1, name='Bridge 1', inspection_date='2023-01-01', status='Good', traffic_load=100)
        bridge1.location = Point(10.0, 20.0)
        bridge1.location.x = 10.0
        bridge1.location.y = 20.0

        bridge2 = MagicMock(id=2, name='Bridge 2', inspection_date='2023-02-01', status='Bad', traffic_load=150)
        bridge2.location = Point(30.0, 40.0)
        bridge2.location.x = 30.0
        bridge2.location.y = 40.0

        mock_objects.all.return_value = [bridge1, bridge2]

        request = self.factory.get('/api/bridge-list/')
        response = bridge_list(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)
        expected_data = {'bridges': [{'id': 1, 'name': 'mock', 'inspection_date': '2023-01-01', 'status': 'Good', 'traffic_load': 100, 'latitude': 20.0, 'longitude': 10.0}, {'id': 2, 'name': 'mock', 'inspection_date': '2023-02-01', 'status': 'Bad', 'traffic_load': 150, 'latitude': 40.0, 'longitude': 30.0}]}
        self.assertEqual(response_data, expected_data)

    @patch('bridge.views.Bridges')
    def test_update_bridge(self, mock_bridges):
        mock_bridge = MagicMock(id=1, name='Bridge 1', inspection_date='2023-01-01', status='Good', traffic_load=100, location=MagicMock(x=10.0, y=20.0))
        mock_bridges.objects.get.return_value = mock_bridge

        update_data = {
            'name': 'Updated Bridge',
            'inspection_date': '2023-03-01',
            'status': 'Normal',
            'traffic_load': 200,
            'latitude': 50.0,
            'longitude': 60.0
        }
        request = self.factory.put('/api/update-bridge/1/', update_data, format='json')
        response = update_bridge(request, id=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_bridge.save.assert_called_once()

    @patch('bridge.views.Bridges.objects.create')
    def test_create_bridge(self, mock_create):
        
        mock_bridge = MagicMock(id=1, inspection_date='2023-03-01', status='Normal', traffic_load=200)
        mock_bridge.location = Point(60.0, 50.0)
        mock_bridge.name = 'New Bridge'
        mock_create.return_value = mock_bridge

        create_data = {
            'name': 'New Bridge',
            'inspection_date': '2023-03-01',
            'status': 'Normal',
            'traffic_load': 200,
            'latitude': 50.0,
            'longitude': 60.0
        }
        request = self.factory.post('/api/create-bridge/', create_data, format='json')
        response = create_bridge(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        obj = {'id': 1, 'name': 'New Bridge', 'location': 'POINT (60 50)', 'inspection_date': '2023-03-01', 'status': 'Normal', 'traffic_load': 200}
        self.assertEqual(response.data, obj)
        mock_create.assert_called_once_with(
            location=Point(60.0, 50.0),
            name='New Bridge',
            inspection_date=datetime.date(2023, 3, 1),
            status='Normal',
            traffic_load=200
        )


    @patch('bridge.views.Bridges')
    def test_delete_bridge(self, mock_bridges):
        mock_bridge = MagicMock(id=1, name='Bridge 1', inspection_date='2023-01-01', status='Good', traffic_load=100, location=MagicMock(x=10.0, y=20.0))
        mock_bridges.objects.get.return_value = mock_bridge

        request = self.factory.delete('/api/delete-bridge/1/')
        response = delete_bridge(request, id=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_bridge.delete.assert_called_once()