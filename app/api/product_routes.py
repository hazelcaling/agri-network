from flask import Blueprint, jsonify, request
from app.models import Product, User, db

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    # data = Product.query.all()
    data = db.session.query(Product).join(User).filter(User.user_type == 'farmer').all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data])
