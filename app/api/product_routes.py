from flask import Blueprint, jsonify, request
from app.models import Product, User, db
from flask_login import login_required, current_user
from datetime import date, datetime

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    data = db.session.query(Product).join(User).filter(User.user_type == 'farmer').all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data])


@product_routes.route('/<int:product_id>')
def get_product(product_id):
    data = db.session.query(Product).join(User).filter(Product.id == product_id and User.id == Product.farmer_id).all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data][0])


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    product_data = request.json
    harvest_date = product_data.get('harvest_date')
    product_data['farmer_id'] = current_user.id
    if harvest_date:
        product_data['harvest_date'] = date.fromisoformat(harvest_date)
    new_product = Product(**product_data)
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201


@login_required
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    dommedProduct = Product.query.get(id)

    if not dommedProduct:
        return jsonify({'message': 'Product not found'}), 404

    isAuthorized = current_user.id == dommedProduct.farmer_id

    if isAuthorized:
        db.session.delete(dommedProduct)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted'})


@login_required
@product_routes.route('/<int:id>', methods=['PUT'])
def edit_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({'message': 'Product not found'}), 404

    if product.farmer_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    updated_data = request.json
    date_str = updated_data['harvest_date']
    date_obj = None

    # Convert date string to date object if date string is provided
    if date_str:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

    updated_data['harvest_date'] = date_obj

    for key, val in updated_data.items():
        setattr(product, key, val)

    db.session.commit()
    return jsonify(product.to_dict())

@product_routes.route('/farmers/<int:farmer_id>')
def get_listings_by_farmer(farmer_id):
    data = db.session.query(Product).join(User).filter(User.id == farmer_id and Product.farmer_id == farmer_id and User.user_type == 'farmer').all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data])
