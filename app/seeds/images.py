from app.models import db, Product, User, Buyer_Request, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_images():
    farmers = db.session.query(User).filter(User.user_type == 'farmer').all()
    farmer_listings = db.session.query(Product).all()
    # buyers = db.session.query(User).filter(User.user_type == 'buyer').all()
    # buyer_listings = db.session.query(Buyer_Request).all()

    onion = Image(
        farmer_id=farmers[0].id,
        product_id=farmer_listings[0].id,
        url='onion.jpg')
    onion2a = Image(
        farmer_id=farmers[1].id,
        product_id=farmer_listings[3].id,
        url='onion2a.jpg')
    onion2b = Image(
        farmer_id=farmers[1].id,
        product_id=farmer_listings[3].id,
        url='onion2b.jpg')
    sili = Image(
        farmer_id=farmers[3].id,
        product_id=farmer_listings[7].id,
        url='sili.jpg')
    pinya = Image(
        farmer_id=farmers[3].id,
        product_id=farmer_listings[8].id,
        url='pinya.jpg')
    db.session.add(onion)
    db.session.add(onion2a)
    db.session.add(onion2b)
    db.session.add(sili)
    db.session.add(pinya)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
