from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', user_type='farmer')
    marnie = User(
        email='marnie@aa.io', password='password', first_name='Marnie', last_name='Barney', user_type='farmer')
    bobbie = User(
        email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Flay', user_type='buyer')
    marvin = User(
        email='marvin@aa.io', password='password', first_name='Marvin', last_name='Malig', user_type='farmer')
    francis = User(
        email='francis@aa.io', password='password', first_name='Francis', last_name='Simbulan', user_type='farmer')
    nieva = User(
        email='nieva@aa.io', password='password', first_name='Nieva', last_name='Lampitoc', user_type='buyer')
    emma = User(
        email='emma@aa.io', password='password', first_name='Emma', last_name='Dayag', user_type='buyer')
    john = User(
        email='john@aa.io', password='password', first_name='John', last_name='Smith', user_type='buyer')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(marvin)
    db.session.add(francis)
    db.session.add(nieva)
    db.session.add(emma)
    db.session.add(john)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
