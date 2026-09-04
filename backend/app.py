import re
import sqlite3
import os
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from werkzeug.exceptions import HTTPException
from werkzeug.security import check_password_hash
from flask_cors import CORS

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / 'portfolio.db'
load_dotenv(BASE_DIR / '.env')

SECRET_KEY = os.getenv('SECRET_KEY')
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME')
ADMIN_PASSWORD_HASH = os.getenv('ADMIN_PASSWORD_HASH')

# Environment variables keep secrets out of source control and deployment logs.
if not SECRET_KEY or not ADMIN_USERNAME or not ADMIN_PASSWORD_HASH:
    raise RuntimeError(
        'SECRET_KEY, ADMIN_USERNAME, and ADMIN_PASSWORD_HASH must be configured.'
    )

app.config.update(
    SECRET_KEY=SECRET_KEY,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE=os.getenv('SESSION_COOKIE_SAMESITE', 'Lax'),
    SESSION_COOKIE_SECURE=os.getenv('SESSION_COOKIE_SECURE', '').lower()
    in {'1', 'true', 'yes'},
)

ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://my-portfolio-wheat-seven-75.vercel.app',
]

FIELD_LIMITS = {
    'name': 100,
    'email': 254,
    'subject': 200,
    'message': 5000,
}

CORS(
    app,
    resources={r'/api/*': {'origins': ALLOWED_ORIGINS}},
    supports_credentials=True,
)


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute(
            '''
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            '''
        )


def is_valid_email(email):
    return re.fullmatch(r'[^@\s]+@[^@\s]+\.[^@\s]+', email) is not None


def validate_contact(data):
    if not isinstance(data, dict):
        return 'Request body must be a JSON object.'

    required_fields = ('name', 'email', 'subject', 'message')
    missing_fields = [
        field for field in required_fields
        if not isinstance(data.get(field), str) or not data[field].strip()
    ]

    if missing_fields:
        return f'Missing required fields: {", ".join(missing_fields)}.'

    for field, maximum_length in FIELD_LIMITS.items():
        if len(data[field].strip()) > maximum_length:
            return f'{field.capitalize()} must be {maximum_length} characters or fewer.'

    if not is_valid_email(data['email'].strip()):
        return 'Please provide a valid email address.'

    return None


@app.post('/api/admin/login')
def admin_login():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({'success': False, 'error': 'Invalid credentials.'}), 401

    username = data.get('username')
    password = data.get('password')
    if not isinstance(username, str) or not isinstance(password, str):
        return jsonify({'success': False, 'error': 'Invalid credentials.'}), 401

    # Compare with a one-way hash instead of storing or comparing a plain password.
    if username != ADMIN_USERNAME or not check_password_hash(
        ADMIN_PASSWORD_HASH, password
    ):
        return jsonify({'success': False, 'error': 'Invalid credentials.'}), 401

    # The session stores only a small authentication marker, never a password.
    session.clear()
    session['admin_authenticated'] = True
    session['admin_username'] = ADMIN_USERNAME
    return jsonify({'success': True, 'message': 'Login successful.'})


@app.post('/api/admin/logout')
def admin_logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logout successful.'})


@app.get('/api/admin/me')
def admin_me():
    return jsonify({'authenticated': session.get('admin_authenticated') is True})


@app.get('/api/admin/messages')
def admin_messages():
    if session.get('admin_authenticated') is not True:
        return jsonify({'success': False, 'error': 'Authentication required.'}), 401

    try:
        with get_connection() as connection:
            rows = connection.execute(
                '''
                SELECT id, name, email, subject, message, created_at
                FROM contacts
                ORDER BY created_at DESC
                '''
            ).fetchall()
        return jsonify([dict(row) for row in rows])
    except sqlite3.Error:
        return jsonify({
            'success': False,
            'error': 'The messages could not be loaded.',
        }), 500


@app.get('/')
def home():
    return jsonify({'success': True, 'message': 'Portfolio backend is running.'})

@app.post('/api/contact')
def create_contact():
    data = request.get_json(silent=True)
    validation_error = validate_contact(data)
    if validation_error:
        status_code = 400
        if validation_error.startswith('Please provide'):
            status_code = 422
        return jsonify({'success': False, 'error': validation_error}), status_code

    try:
        with get_connection() as connection:
            connection.execute(
                '''
                INSERT INTO contacts (name, email, subject, message, created_at)
                VALUES (?, ?, ?, ?, ?)
                ''',
                (
                    data['name'].strip(),
                    data['email'].strip(),
                    data['subject'].strip(),
                    data['message'].strip(),
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
        return jsonify({'success': True, 'message': 'Your message was saved successfully.'}), 201
    except sqlite3.Error:
        return jsonify({'success': False, 'error': 'The message could not be saved.'}), 500


@app.errorhandler(Exception)
def handle_unexpected_error(error):
    if isinstance(error, HTTPException):
        return jsonify({
            'success': False,
            'error': 'The requested resource was not found.'
            if error.code == 404 else 'The request could not be completed.'
        }), error.code or 500

    return jsonify({
        'success': False,
        'error': 'An unexpected server error occurred.'
    }), 500


initialize_database()


if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', '').lower() in {'1', 'true', 'yes'}
    app.run(debug=debug_mode, port=5000)
