from flask import Blueprint, jsonify, request
from app.models import Product, User, db, Image
from flask_login import login_required, current_user
from datetime import date, datetime
from app.api.aws_helper  import get_unique_filename, upload_file_to_s3
import os
from sqlalchemy import or_

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    data = db.session.query(Product).join(User).filter(User.user_type == 'farmer').all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data])


@product_routes.route('/<int:product_id>')
def get_product(product_id):
    data = db.session.query(Product).join(User).filter(Product.id == product_id and User.id == Product.farmer_id).all()
    return jsonify([{**product.to_dict(), 'farmer': f'{product.farmer.first_name} {product.farmer.last_name}'} for product in data][0])


# # (AWS S3) Upload an image for a business based on the business' id
@product_routes.route('/<int:product_id>/images/upload', methods=['POST'])
@login_required
def upload_image(product_id):
    image = request.files["image"]

    if image:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print('upload', upload)

        if "url" not in upload:
            return jsonify({"error": upload}), 400

        url = upload["url"]
        new_image = Image(farmer_id=current_user.id, product_id=product_id, url=url)
        db.session.add(new_image)
        db.session.commit()
        return jsonify({"message": "Image uploaded successfully", "url": url}), 200

    return jsonify({"error": "Unexpected error occurred"}), 500


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


@product_routes.route('/<int:product_id>/images', methods=['GET'])
def get_images_by_product(product_id):
    """
    Fetches all images for a specific farmer listing.
    """
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'message': 'Listing could not be found'}), 404

    images = Image.query.filter(Image.product_id == product_id).all()

    return jsonify([image.to_dict() for image in images]), 200


## Search products
@product_routes.route('/search')
def search_products():
    """
    Search product by product type, description
    """
    product = request.args.get('product_type', type=str)
    description = request.args.get('description', type=str)

    # Check if both product and description are not provided
    if not product and not description:
        results = db.session.query(Product).join(User).filter(User.user_type == 'farmer').all()  # Fetch all products
    else:
        # Perform search based on provided parameters
        results = Product.query.filter(
            or_(Product.product_type.ilike(f"%{product}%"), Product.description.ilike(f"%{description}%"))
        ).all()

    return jsonify([product.to_dict() for product in results]), 200
