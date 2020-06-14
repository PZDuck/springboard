from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import InputRequired, Email, Regexp


class InfoForm(FlaskForm):
    name = StringField('Username', validators=[InputRequired()])
    email = StringField('Email', validators=[InputRequired(), Email(message="Invalid Email")])
    year = StringField('Year of Birth', validators=[InputRequired(), Regexp(r'^(19[0-9]{2}|2[0]{3})$', message="Invalid input")])
    color = SelectField('Favorite Color', choices=[('red', 'red'),('green', 'green'),('orange', 'orange'),('blue', 'blue')], validators=[InputRequired()])