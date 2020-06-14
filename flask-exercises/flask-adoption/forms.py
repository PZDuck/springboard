from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField, SelectField, BooleanField, FileField
from wtforms.validators import InputRequired, URL, Optional, NumberRange


class PetForm(FlaskForm):
    name = StringField('Pet name:', validators=[InputRequired()])
    species = SelectField('Species:', choices=[('cat', 'cat'), ('dog', 'dog'), ('porcupine', 'porcupine')])
    photo_url = TextField('Photo URL:', validators=[URL(), Optional()])
    photo_file = FileField('Or upload your image:')
    age = IntegerField('Age:', validators=[NumberRange(min=0, max=30)])
    notes = TextField('Notes:')

class EditPetForm(FlaskForm):
    photo_url = TextField('Photo URL:', validators=[URL()])
    notes = TextField('Notes:')
    photo_file = FileField('Or upload your image:')
    available = BooleanField('Available:')