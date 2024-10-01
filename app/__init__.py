import os
import logging
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_apscheduler import APScheduler
from datetime import datetime
from .models import db, User, Product
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.product_routes import product_routes
from .api.buyer_request_routes import buyer_request_routes
from .api.product_image_routes import image_routes
from .seeds import seed_commands
from .config import Config


# Set up logging
logging.basicConfig(level=logging.INFO)


app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)


# Set up the app configuration
app.config.from_object(Config)


# Initialize database and migrations
db.init_app(app)
Migrate(app, db)


# Application Security
CORS(app)


# Register Blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(buyer_request_routes, url_prefix='/api/buyer-requests')
app.register_blueprint(image_routes, url_prefix='/api/product-images')


# Initialize APScheduler
scheduler = APScheduler()


# Schedule the product availability update task
def update_product_availability():
    with app.app_context():
        current_date = datetime.now().date()

        # Update products that should be available now based on harvest date
        products_to_update = Product.query.filter(
            Product.harvest_date <= current_date,
            Product.available_now == False
        ).all()

        # Set available_now to True for products with past harvest dates
        for product in products_to_update:
            product.available_now = True

        # Commit the changes to the database
        db.session.commit()

        # Log the number of updated products
        logging.info(f'Updated {len(products_to_update)} products to available now based on past harvest dates.')

        # Optional: Update available_now status for future harvests that are now available
        products_to_update_future = Product.query.filter(
            Product.harvest_date > current_date,
            Product.available_now == True
        ).all()

        # Set available_now to False for products with future harvest dates
        for product in products_to_update_future:
            product.available_now = False

        # Commit the changes to the database for future harvest updates
        db.session.commit()

        # Log the number of updated products
        logging.info(f'Updated {len(products_to_update_future)} products to not available now based on future harvest dates.')


# Only start scheduler in production
if os.environ.get('FLASK_ENV') == 'production':
    scheduler.init_app(app)
    scheduler.add_job(id='update_availability_job', func=update_product_availability, trigger='cron', hour=0)
    scheduler.start()


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
# HTTPS redirect for production
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


# CSRF token handling
@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response



@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


# React route handling
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


# Error handling
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
