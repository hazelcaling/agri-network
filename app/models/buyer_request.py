from .db import db, environment, SCHEMA, add_prefix_for_prod


class Buyer_Request(db.Model):
    __tablename__ = 'buyer_requests'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_type = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(100))
    location = db.Column(db.String(20))
    offer_price = db.Column(db.Integer)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'product_type': self.product_type,
            'description': self.description,
            'location': self.location,
            'offer_price': self.offer_price,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
    # Relationships
    buyer = db.relationship('User', back_populates='buyer_requests')
    images = db.relationship('Image', back_populates='buyer_listing')
