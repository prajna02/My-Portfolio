import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException
from flask_cors import CORS

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / 'portfolio.db'
ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

CORS(app, resources={r'/api/*': {'origins': ALLOWED_ORIGINS}})


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

    if not is_valid_email(data['email'].strip()):
        return 'Please provide a valid email address.'

    return None

@app.get('/')
def home():
    return jsonify({
        'success': True,
        'message': 'Portfolio backend is running.'
    })

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


@app.get('/api/contact')
def list_contacts():
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
        return jsonify({'success': False, 'error': 'The messages could not be loaded.'}), 500


@app.errorhandler(Exception)
def handle_unexpected_error(error):
    if isinstance(error, HTTPException):
        return jsonify({
            'success': False,
            'error': error.description
        }), error.code

    app.logger.exception('Unexpected server error')
    return jsonify({
        'success': False,
        'error': 'An unexpected server error occurred.'
    }), 500


initialize_database()


if __name__ == '__main__':
    app.run(debug=True, port=5000)
