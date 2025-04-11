import mysql.connector
from src import logger
from mysql.connector import Error
from flask import jsonify
import os

# CONNECTION TO DATABASE
# Change db_pro to True if you want to connect to the production database
db_pro = False
def connection():
    try:
        
        # Connection to the production database
        if db_pro:
            logger.info("Connecting to the production database")
            conn = mysql.connector.connect(
            host=os.getenv('DB_HOST_PRO'),
            user=os.getenv('DB_USER_PRO'),
            password=os.getenv('DB_PASSWORD_PRO'),
            database=os.getenv('DB_DATABASE_PRO'),
            charset="utf8mb4")
            if conn.is_connected():
                logger.info("Connected to the production database")
                return conn
            
        # Connection to the development database
        else:
            logger.info("Connecting to the development database")
            conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_DATABASE'),
            charset="utf8mb4")
            if conn.is_connected():
                logger.info("Connected to the development database")
                return conn
        
    except Error as e:
        print(f"Error connecting to MySQL Platform: {e}")
        return jsonify({"message": "Error en el servidor"}), 500
