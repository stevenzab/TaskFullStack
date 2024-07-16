from django.test import TestCase, Client
from django.urls import reverse, resolve
from bridge.views import bridge_list, bridge_details, update_bridge, create_bridge, delete_bridge

class TestViews(TestCase):

    def test_list_get(self):
        client = Client()

        response = client.get(reverse('bridge_list'))
        self.assertEqual(response.status_code, 200)