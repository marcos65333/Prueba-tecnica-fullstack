import os
from dotenv import load_dotenv

load_dotenv()

# This is the configuration file for the Flask application.
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("No SECRET_KEY set for Flask application.")
    # Use environment variable to set debug or default to False in production
    DEBUG = True
    
    # Secure session settings
    #SESSION_COOKIE_SECURE = False
    #SESSION_COOKIE_HTTPONLY = False
    #SESSION_COOKIE_SAMESITE = 'None'

    ALLOWED_ORIGINS = ['http://0.0.0.0:5173']  # Default to localhost or your ip adress


