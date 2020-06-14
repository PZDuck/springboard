from models import db, User, Post, Tag, PostTag
from app import app

db.drop_all()
db.create_all()

User.query.delete()

user1 = User(id=1, first_name='John', last_name='Doe')
user2 = User(id=2, first_name='TestF', last_name='TestL')
user3 = User(id=3, first_name='Siju', last_name='Ahuel')

post1 = Post(title='Hai', content='Poshel v pyzdu', user_id=1)

tag1 = Tag(name='Puk')
tag2 = Tag(name='Srenk')

posttag1 = PostTag(post_id=1, tag_id=1)
posttag2 = PostTag(post_id=1, tag_id=2)

db.session.add_all([user1, user2, user3])

db.session.commit()

db.session.add(post1)

db.session.commit()

db.session.add_all([tag1, tag2])

db.session.commit()

db.session.add_all([posttag1, posttag2])

db.session.commit()