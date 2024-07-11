from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    buyer_listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('buyer_requests.id')), nullable=True)
    url = db.Column(db.String(100))
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'farmer_id': self.farmer_id,
            'product_id': self.product_id,
            'buyer_id': self.buyer_id,
            'buyer_listing_id': self.buyer_listing_id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    # Relationships
    product = db.relationship('Product', back_populates='images')
    buyer_listing = db.relationship('Buyer_Request', back_populates='images')
