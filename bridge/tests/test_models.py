from django.test import SimpleTestCase
import mock
from django.contrib.gis.geos import Point
from bridge.models import Bridges

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

        self.assertEqual(bridge.name, 'Mock Bridge')
        self.assertEqual(bridge.location.x, 12.345)
        self.assertEqual(bridge.location.y, 67.890)
        self.assertEqual(bridge.inspection_date, '2024-01-01')
        self.assertEqual(bridge.status, 'Good')
        self.assertEqual(bridge.traffic_load, 1000)