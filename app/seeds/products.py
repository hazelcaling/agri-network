from app.models import db, Product, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_products():
    users = db.session.query(User).filter(User.user_type == 'farmer').all()
    onion1 = Product(
        farmer_id=users[0].id, product_type='Onion', description='Red Onion', location='Nueva Ecija', available_now=True)
    onion2 = Product(
        farmer_id=users[0].id, product_type='Onion', description='Native Onion', location='Nueva Ecija', harvest_date=datetime.strptime('10/24/2024', '%m/%d/%Y').date(), available_now=False)
    eggplant = Product(
        farmer_id=users[1].id, product_type='Eggplant', description='A large glossy, dark purple eggplant with a rich flavor', location='Tarlac', harvest_date=datetime.strptime('08/01/2024', '%m/%d/%Y').date(), available_now=False)

    db.session.add(onion1)
    db.session.add(onion2)
    db.session.add(eggplant)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
