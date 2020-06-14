from models import Playlist, Song, PlaylistSong, db
from app import app

db.drop_all()
db.create_all()

song1 = Song(title='Ya sosal menya ebali', artist='Butirka')
song2 = Song(title='Huli tak slojno blyad', artist='Pizdec')
song3 = Song(title='Siju ahuel', artist='Pajiloy muzikant')

db.session.add_all([song1, song2, song3])
db.session.commit()

playlist1 = Playlist(name='Moy playlist', description='bdabdabdabdab')
playlist2 = Playlist(name='Govnina', description='Kushat podano')

db.session.add_all([playlist1, playlist2])
db.session.commit()

ps1 = PlaylistSong(playlist_id=1, song_id=1)
ps2 = PlaylistSong(playlist_id=1, song_id=3)
ps3 = PlaylistSong(playlist_id=2, song_id=1)
ps4 = PlaylistSong(playlist_id=2, song_id=2)
ps5 = PlaylistSong(playlist_id=2, song_id=3)

db.session.add_all([ps1, ps2, ps3, ps4, ps5])
db.session.commit()