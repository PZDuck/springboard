"""Forms for playlist app."""

from wtforms import SelectField, StringField, TextField
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired, Optional

class PlaylistForm(FlaskForm):
    """Form for adding playlists."""
    name = StringField('Name', validators=[InputRequired()])
    description = TextField('Description', validators=[Optional()])

    # Add the necessary code to use this form


class SongForm(FlaskForm):
    """Form for adding songs."""
    title = StringField('Title', validators=[InputRequired()])
    artist = StringField('Artist', validators=[InputRequired()])
    # Add the necessary code to use this form


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int, validators=[InputRequired()])
