from app.models import db, Buyer_Request, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_buyer_requests():
    users = db.session.query(User).filter(User.user_type == 'buyer').all()
    onion = Buyer_Request(
        buyer_id=users[0].id, product_type='Onion', description='Need 20 kgs of red onions. Looking for medium-sized, preferably organic.', location='Nueva Ecija', offer_price=35)
    corn = Buyer_Request(
        buyer_id=users[1].id, product_type='Corn', description='Looking to buy 200 kgs of sweet corn. Must be fresh and preferably non-GMO.', location='Tarlac', offer_price=50)
    talong = Buyer_Request(
        buyer_id=users[2].id, product_type='Eggplant', description='Looking to buy 400 kgs of eggplant', location='Manila', offer_price=200)
    garlic = Buyer_Request(
        buyer_id=users[3].id, product_type='Garlic', description='Looking to buy 600 kgs of garlic', location='Cavite', offer_price=300)
    mango = Buyer_Request(
        buyer_id=users[3].id, product_type='Mango', description='Looking to buy 100 kgs of mango', location='Cavite', offer_price=100)
    okra = Buyer_Request(
        buyer_id=users[2].id, product_type='Okra', description='Looking to buy 100 kgs of okra', location='Manila', offer_price=150)
    tomato = Buyer_Request(
        buyer_id=users[1].id, product_type='Tomato', description='Looking to buy 50 kgs of tomato', location='Tarlac', offer_price=90)
    db.session.add(onion)
    db.session.add(corn)
    db.session.add(talong)
    db.session.add(garlic)
    db.session.add(mango)
    db.session.add(okra)
    db.session.add(tomato)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_buyer_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.buyer_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM buyer_requests"))

    db.session.commit()
