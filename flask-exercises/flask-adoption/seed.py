from models import db, Pet
from app import app

db.drop_all()
db.create_all()

pet1 = Pet(name="Syn Sobaki", species="dog", photo_url="https://im0-tub-ru.yandex.net/i?id=c4ad014eaffae01353520b8e57c4f236&n=13", age="5", available=True)
pet2 = Pet(name="Kot", species="cat", photo_url="https://avatars.mds.yandex.net/get-pdb/1602331/479fab15-9c04-4772-a3a5-16ba3700b8b9/s1200?webp=false", age="6", available=True)

db.session.add_all([pet1, pet2])

db.session.commit()
