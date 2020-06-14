from app import app
from flask import session
from unittest import TestCase

class ConversionTestCase(TestCase):
    
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False


    def test_show_currency_form(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertIn('<input id="convert_from" name="convert_from" type="text" value="">', html)
            self.assertIn('<input id="convert_to" name="convert_to" type="text" value="">', html)
            self.assertIn('<input id="amount" name="amount" type="text" value="">', html)
    

    def test_post_currency_form(self):
        with app.test_client() as client:
            resp = client.post('/', data={'convert_from': 'USD', 'convert_to': 'USD', 'amount': 1}, follow_redirects=True)

            self.assertEqual(resp.status_code, 200)

            resp = client.get('/converted', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertIn('The result is US$ 1.00', html)
    

    def test_post_currency_form_wrong_currency_from(self):
        with app.test_client() as client:
            resp = client.post('/', data={'convert_from': 'XXX', 'convert_to': 'USD', 'amount': 1}, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<li class="list-group-item list-group-item-danger error">Incorrect currency code: XXX</li>', html)


    def test_post_currency_form_wrong_currency_to(self):
        with app.test_client() as client:
            resp = client.post('/', data={'convert_from': 'USD', 'convert_to': 'YYY', 'amount': 1}, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<li class="list-group-item list-group-item-danger error">Incorrect currency code: YYY</li>', html)


    def test_post_currency_form_wrong_amount(self):
        with app.test_client() as client:
            resp = client.post('/', data={'convert_from': 'USD', 'convert_to': 'USD', 'amount': -1}, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)                    
            self.assertIn('<li class="list-group-item list-group-item-danger error">Not a valid amount</li>', html)
    

    def test_post_currency_form_session(self):
        with app.test_client() as client:
            resp = client.post('/', data={'convert_from': 'USD', 'convert_to': 'USD', 'amount': 1})
            
            self.assertEqual(session['symbol'], 'US$')
            self.assertEqual(session['amount'], '1.00')