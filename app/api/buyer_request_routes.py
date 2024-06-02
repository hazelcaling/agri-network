from flask import Blueprint, jsonify, request
from app.models import Buyer_Request, db, User
from flask_login import login_required, current_user

buyer_request_routes = Blueprint('buyer_requests', __name__)

@buyer_request_routes.route('/')
def get_all_buyerReq():
    data = db.session.query(Buyer_Request).join(User).filter(User.user_type == 'buyer').all()
    return jsonify([{**buyer_req.to_dict(), 'buyer': f'{buyer_req.buyer.first_name} {buyer_req.buyer.last_name}'} for buyer_req in data])


@buyer_request_routes.route('/buyers/<int:buyer_id>')
def get_listings_by_buyer(buyer_id):
    """
    Get all listings by buyer id

    """
    data = db.session.query(Buyer_Request).join(User).filter(User.id == buyer_id and Buyer_Request.buyer_id == buyer_id and User.user_type == 'buyer').all()
    return jsonify([{**buyer_req.to_dict(), 'buyer': f'{buyer_req.buyer.first_name} {buyer_req.buyer.last_name}'} for buyer_req in data])


@buyer_request_routes.route('/<int:id>')
def get_buyer_request(id):
    """
    Get Buyer Request details by buyerReqId

    """
    data = db.session.query(Buyer_Request).join(User).filter(Buyer_Request.id == id and User.id == Buyer_Request.buyer_id).all()
    return jsonify([{**buyer_req.to_dict(), 'buyer': f'{buyer_req.buyer.first_name} {buyer_req.buyer.last_name}'} for buyer_req in data][0])


@login_required
@buyer_request_routes.route('<int:buyerReqId>', methods=['DELETE'])
def delete_buyer_request(buyerReqId):
    buyerReq = Buyer_Request.query.get(buyerReqId)

    isAuthorized = current_user.id == buyerReq.buyer_id

    if isAuthorized:
        db.session.delete(buyerReq)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted'})


@login_required
@buyer_request_routes.route('/', methods=['POST'])
def create_buyer_req():
    buyer_req = request.json
    new_listing = Buyer_Request(**buyer_req)
    db.session.add(new_listing)
    db.session.commit()
    return jsonify(new_listing.to_dict()), 201


@login_required
@buyer_request_routes.route('/<int:id>', methods=['PUT'])
def edit_buyer_req(id):
    listing = Buyer_Request.query.get(id)

    if not listing:
        return jsonify({'message': 'Listing not found'}), 404

    if listing.buyer_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    updated_data = request.json

    for key, val in updated_data.items():
        setattr(listing, key, val)

    db.session.commit()
    return jsonify(listing.to_dict())
