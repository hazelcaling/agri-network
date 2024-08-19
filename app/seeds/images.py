from app.models import db, Product, User, Buyer_Request, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_images():
    farmers = db.session.query(User).filter(User.user_type == 'farmer').all()
    farmer_listings = db.session.query(Product).all()
    # buyers = db.session.query(User).filter(User.user_type == 'buyer').all()
    # buyer_listings = db.session.query(Buyer_Request).all()

    onion2a = Image(
        farmer_id=farmers[1].id,
        product_id=farmer_listings[0].id,
        url='https://agrinetwork-images.s3.us-west-1.amazonaws.com/48c23acdfe424e9885ef4e3e75033f39.jpg')
    sili = Image(
        farmer_id=farmers[3].id,
        product_id=farmer_listings[1].id,
        url='https://agrinetwork-images.s3.us-west-1.amazonaws.com/9ae5e25fad5d424fb3543844e27772c5.jpg')
    pinya = Image(
        farmer_id=farmers[3].id,
        product_id=farmer_listings[2].id,
        url='https://agrinetwork-images.s3.us-west-1.amazonaws.com/3a15b31926c041d5abcc3f679e42aacd.jpg')

    db.session.add(onion2a)
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
