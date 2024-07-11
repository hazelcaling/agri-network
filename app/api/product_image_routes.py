from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Image
from app.api.aws_helper import remove_file_from_s3

image_routes = Blueprint('product-images', __name__)

@image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
    """
    Deletes an image belonging to a specific product of a logged-in user.
    """
    image = Image.query.get(image_id)
    if not image:
        return jsonify({'message': 'Image could not be found'}), 404

    if image.farmer_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    # Remove file from S3 before deleting the image record
    if image.url:
        remove_file_from_s3(image.url)

    db.session.delete(image)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200
