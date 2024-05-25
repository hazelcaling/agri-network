from app.models import db, Buyer_Request, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_buyer_requests():
    users = db.session.query(User).filter(User.user_type == 'buyer').all()
    onion1 = Buyer_Request(
        buyer_id=users[0].id, product_type='Onion', description='Need 20 kgs of red onions. Looking for medium-sized, fresh onions, preferably organic.', location='Nueva Ecija', offer_price=95)
    watermelon = Buyer_Request(
        buyer_id=users[0].id, product_type='Watermelon', description='Looking to buy 100 kgs of seedless watermelons. Preferably organic.', location='Nueva Ecija', offer_price=40)
    onion2 = Buyer_Request(
        buyer_id=users[1].id, product_type='Onion', description='Need 30 kgs of red onions. Looking for medium-sized, fresh onions, preferably organic.', location='Manila', offer_price=100)
    corn = Buyer_Request(
        buyer_id=users[1].id, product_type='Corn', description='Looking to buy 200 kgs of sweet corn. Must be fresh and preferably non-GMO.', location='Manila', offer_price=50)

    db.session.add(onion1)
    db.session.add(watermelon)
    db.session.add(onion2)
    db.session.add(corn)
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
