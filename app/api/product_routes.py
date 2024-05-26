from flask import Blueprint, jsonify, request
from app.models import Product, User, db

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    data = db.session.query(Product).join(User).filter(User.user_type == 'farmer').all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data])


@product_routes.route('/<int:product_id>')
def get_product(product_id):
    data = db.session.query(Product).join(User).filter(Product.id == product_id and User.id == Product.farmer_id).all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data][0])
