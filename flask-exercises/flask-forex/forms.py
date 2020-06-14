from flask_wtf import FlaskForm
from wtforms import StringField, FloatField


class CurrencyForm(FlaskForm):
    convert_from = StringField('Convert From')
    convert_to = StringField('Convert To')
    amount = FloatField('Amount')
    