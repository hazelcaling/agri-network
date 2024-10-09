from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(15), nullable=False)
    last_name = db.Column(db.String(15), nullable=False)
    user_type = db.Column(db.String(10), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_type': self.user_type
        }

    # Relationships
    products = db.relationship('Product', back_populates='farmer', cascade='all, delete-orphan')
    buyer_requests = db.relationship('Buyer_Request', back_populates='buyer', cascade='all, delete-orphan')

    # Relationships for messaging
    sent_messages = db.relationship('Message', foreign_keys='Message.sender_id', back_populates='sender', cascade='all, delete-orphan')
    received_messages = db.relationship('Message', foreign_keys='Message.receiver_id', back_populates='receiver', cascade='all, delete-orphan')
