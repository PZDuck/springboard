import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_PATH = "sqlite:///stories.sqlite3?check_same_thread=False"
Base = declarative_base()


class Opening(Base):
    __tablename__ = "opening"

    id = sa.Column(sa.INTEGER, primary_key=True)
    text = sa.Column(sa.TEXT)

    def __init__(self, text):
        self.text = text

class Following(Base):
    __tablename__ = "following"

    id = sa.Column(sa.INTEGER, primary_key=True)
    text = sa.Column(sa.TEXT)

    def __init__(self, text):
        self.text = text

class Ending(Base):
    __tablename__ = "ending"

    id = sa.Column(sa.INTEGER, primary_key=True)
    text = sa.Column(sa.TEXT)
    
    def __init__(self, text):
        self.text = text


def connect_db():
    engine = sa.create_engine(DB_PATH)
    session = sessionmaker(engine)
    return session()


def add_story(story_parts):
    new_opening = Opening(story_parts['opening'])
    new_ending = Ending(story_parts['ending'])
    new_following = Following(story_parts['following'])
    
    session = connect_db()

    session.add_all([new_opening,new_ending, new_following])
    session.commit()


def generate(words):
    from sqlalchemy import func

    session = connect_db()

    opening = session.query(Opening).order_by(func.random()).first()
    following = session.query(Following).order_by(func.random()).first()
    ending = session.query(Ending).order_by(func.random()).first()

    return f"{opening.text} {words[0]}, {following.text} {words[1]} {words[2]}. {ending.text} {words[3]} {words[4]}"
