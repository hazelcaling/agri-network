from app.models import db, Product, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_products():
    users = db.session.query(User).filter(User.user_type == 'farmer').all()
    onion = Product(
        farmer_id=users[0].id, product_type='Onion', description='Sibuyas de uno linis at dry na pickup only 35/per kilo. If interested call 0963-000-1111.', location='Baguio', available_now=True)
    onion2 = Product(
        farmer_id=users[1].id, product_type='Onion', description='Available 2 tons 25 per kilo. San Jose City Nueva Ecija. If interested tawag lang po kayo sa number na 0963-222-4444', location='Nueva Ecija', available_now=True)
    eggplant = Product(
        farmer_id=users[2].id, product_type='Eggplant', description='Talong pickup only', location='Cavite', harvest_date=datetime.strptime('09/01/2024', '%m/%d/%Y').date(), available_now=False)
    sili = Product(
        farmer_id=users[3].id, product_type='Pepper', description='Red Sili 1300/10kgs via lalamove delivery', location='Tarlac', available_now=True)
    cabbage = Product(
        farmer_id=users[0].id, product_type='Cabbage', description='Pickup only', location='Baguio', harvest_date=datetime.strptime('09/10/2024', '%m/%d/%Y').date(), available_now=False)
    strawberry = Product(
        farmer_id=users[0].id, product_type='Strawberry', description='Pickup only', location='Baguio', harvest_date=datetime.strptime('08/15/2024', '%m/%d/%Y').date(), available_now=False)
    tomato = Product(
        farmer_id=users[2].id, product_type='Tomato', description='Kamatis premera Php300 per bag, Php270 min 5-9 bags, Php250 min 10 bags up. Pm lang po sa interesado', location='Baguio', harvest_date=datetime.strptime('08/15/2024', '%m/%d/%Y').date(), available_now=False)
    pinya = Product(
        farmer_id=users[3].id, product_type='Pineapple', description='Pinya sweet and juicy available for delivery in Tarlac/Pampanga only.', location='Tarlac', available_now=True)
    pakwan = Product(
        farmer_id=users[1].id, product_type='Watermelon', description='Pickup only', location='Nueva Ecija', harvest_date=datetime.strptime('08/20/2024', '%m/%d/%Y').date(), available_now=False)
    db.session.add(onion)
    db.session.add(onion2)
    db.session.add(eggplant)
    db.session.add(sili)
    db.session.add(cabbage)
    db.session.add(strawberry)
    db.session.add(tomato)
    db.session.add(pinya)
    db.session.add(pakwan)
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
