from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_type = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(160))
    location = db.Column(db.String(100))
    available_now = db.Column(db.Boolean, default=False)
    harvest_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    def to_dict(self):
        return {
            'id': self.id,
            'farmer_id': self.farmer_id,
            'product_type': self.product_type,
            'description': self.description,
            'location': self.location,
            'available_now': self.available_now,
            'harvest_date': self.harvest_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    # Relationships
    farmer = db.relationship('User', back_populates='products')
    images = db.relationship('Image', back_populates='product')
