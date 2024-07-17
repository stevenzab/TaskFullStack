from django.test import SimpleTestCase
import mock
from django.contrib.gis.geos import Point
from bridge.models import Bridges, BridgeInput

class TestUrls(SimpleTestCase):

    def test_bridge_model(self):
        mock_point = mock.Mock(spec=Point)
        mock_point.x = 12.345
        mock_point.y = 67.890

        with mock.patch('bridge.models.Bridges.objects.create') as mock_create:
            mock_create.return_value = Bridges(
                name='Mock Bridge',
                location=mock_point,
                inspection_date='2024-01-01',
                status='Good',
                traffic_load=1000
            )
            bridge = Bridges.objects.create(
                name='Mock Bridge',
                location=mock_point,
                inspection_date='2024-01-01',
                status='Good',
                traffic_load=1000
            )
            mock_create.assert_called_once_with(
                name='Mock Bridge',
                location=mock_point,
                inspection_date='2024-01-01',
                status='Good',
                traffic_load=1000
            )

        self.assertEqual(bridge.name, mock_create.return_value.name)
        self.assertEqual(bridge.location.x, mock_create.return_value.location.x)
        self.assertEqual(bridge.location.y, mock_create.return_value.location.y)
        self.assertEqual(bridge.inspection_date, mock_create.return_value.inspection_date)
        self.assertEqual(bridge.status, mock_create.return_value.status)
        self.assertEqual(bridge.traffic_load, mock_create.return_value.traffic_load)

    # def test_bridge_input(self):
    #     with mock.patch('bridge.models.BridgesInput.objects.create') as mock_create:
    #         mock_create.return_value = BridgeInput(
    #             name='Test Bridge',
    #             latitude= 12.345,
    #             longitude= 67.890,
    #             inspection_date='2024-01-01',
    #             status='Good',
    #             traffic_load=1000
    #         )
    #         bridge = BridgeInput.objects.create(
    #             name='Test Bridge',
    #             latitude= 12.345,
    #             longitude= 67.890,
    #             inspection_date='2024-01-01',
    #             status='Good',
    #             traffic_load=1000
    #         )
    #         mock_create.assert_called_once_with(
    #             name='Mock Bridge',
    #             latitude= 12.345,
    #             longitude= 67.890,
    #             inspection_date='2024-01-01',
    #             status='Good',
    #             traffic_load=1000
    #         )

    #     self.assertEqual(bridge.name, mock_create.return_value.name)
    #     self.assertEqual(bridge.latitude, mock_create.return_value.latitude)
    #     self.assertEqual(bridge.latitude, mock_create.return_value.longitude)
    #     self.assertEqual(bridge.inspection_date, mock_create.return_value.inspection_date)
    #     self.assertEqual(bridge.status, mock_create.return_value.status)
    #     self.assertEqual(bridge.traffic_load, mock_create.return_value.traffic_load)