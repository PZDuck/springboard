from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField
from wtforms.validators import InputRequired, URL, NumberRange


class CupcakeForm(FlaskForm):
    flavor = StringField('Flavor', validators=[InputRequired()])
    size = SelectField('Size', choices=[('small', 'small'), ('medium', 'medium'), ('large', 'large'), ('huge', 'huge'), ('massive', 'massive')])
    rating = FloatField('Rating', validators=[NumberRange(min=0, max=10), InputRequired()])
    image = StringField('Image URL', validators=[URL()])

class SearchForm(FlaskForm):
    flavor = StringField('Flavor', validators=[InputRequired()], id="search-flavor")
    