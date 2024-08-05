"""Jackpot development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = (
    b"\x17N6\xcd\xf7D\x84\xab'\x8e\xd0\x8e\xaf\xe7(\xe6"
    b"f\xda\x1a\xaa\xcf1\xd1\xaa"
)

SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
JACKPOT_ROOT = pathlib.Path(__file__).resolve().parent.parent
# UPLOAD_FOLDER = JACKPOT_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# Database file is var/jackpot.sqlite3
# DATABASE_FILENAME = JACKPOT_ROOT/'var'/'jackpot.sqlite3'