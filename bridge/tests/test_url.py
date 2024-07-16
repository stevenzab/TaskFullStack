from django.test import SimpleTestCase
from django.urls import reverse, resolve
from bridge.views import bridge_list, bridge_details, update_bridge, create_bridge, delete_bridge

class TestUrls(SimpleTestCase):
    
    def test_list_url(self):
        url = reverse('bridge_list')
        self.assertEqual(resolve(url).func, bridge_list)
    
    def test_details_url(self):
        bridge_id = 1
        url = reverse('bridge_details',  args=[bridge_id])
        self.assertEqual(resolve(url).func, bridge_details)
    
    def test_update_url(self):
        bridge_id = 1 
        url = reverse('update_bridge', args=[bridge_id])
        self.assertEqual(resolve(url).func, update_bridge)
    
    def test_create_url(self):
        url = reverse('create_bridge')
        self.assertEqual(resolve(url).func, create_bridge)
    
    def test_delete_url(self):
        bridge_id = 1
        url = reverse('delete_bridge', args=[bridge_id])
        self.assertEqual(resolve(url).func, delete_bridge)