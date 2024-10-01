# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY
# ARG S3_KEY
# ARG S3_SECRET
# ARG S3_BUCKET

# WORKDIR /var/www

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn app:app


FROM python:3.9.18-alpine3.18

# Install build dependencies in one step
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set build arguments (these are optional if they are for runtime config)
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG S3_KEY
ARG S3_SECRET
ARG S3_BUCKET

# Set working directory
WORKDIR /var/www

# Copy the requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY . .

# Run database migrations and seed data
RUN flask db upgrade && flask seed all

# Run the app with Gunicorn
CMD ["gunicorn", "--workers=1", "--bind=0.0.0.0:8000", "app:app"]
