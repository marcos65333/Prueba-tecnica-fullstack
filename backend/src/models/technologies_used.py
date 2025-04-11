from flask import jsonify
from src import logger
from src.config.bd_config import connection

class Technologies_used_model:
    def __init__(self):
        self.conexion = connection

    # Method to create a new record in the technologies_used table
    def create(self, project_id:int, data:list):
        conn = self.conexion()
        cursor = conn.cursor()
        try:
            logger.info("Creating record in technologies_used table")
            for item in data:
                # Insert the record into the database
                print(item['name'])
                sql = "INSERT INTO technologies_used (name, project_id) VALUES (%s, %s)"
                values = (item['name'], project_id)
                cursor.execute(sql, values)
                conn.commit()                
            # Commit the transaction
            logger.info("Record inserted successfully.")
            return jsonify({"message": "Technologies inserted successfully."}), 201
        except Exception as e:
            logger.error(f"Error inserting Technologies: {e}")
            conn.rollback()
            return jsonify({"error": "Error inserting Technologies"}), 500

        finally:
            cursor.close()
            conn.close()
    
    # Method to get all records by project_id
    def get_all_by_project_id(self, project_id:int):
        conn = self.conexion()
        cursor = conn.cursor()
        try:
            tecnologies = []
            logger.info("Fetching all records from technologies_used table")
            sql = "SELECT * FROM technologies_used WHERE project_id = %s"
            cursor.execute(sql, (project_id,))
            for row in cursor.fetchall():
                tecnologies.append({
                    "id": row[0],
                    "name": row[1],
                    "project_id": row[2]
                })
            logger.info("Records fetched successfully.")
            return tecnologies
        except Exception as e:
            logger.error(f"Error fetching Technologies: {e}")
            return jsonify({"error": "Error fetching Technologies"}), 500
        finally:
            cursor.close()
            conn.close()
    
    def entries_validate(self, data):
        """
        Validate the entries in the data dictionary.
        """
        if not isinstance(data, dict):
            logger.error("Invalid data format. Expected a dictionary.")
            return False

        required_keys = ['name', 'project_id']
        for key in required_keys:
            if key not in data:
                logger.error(f"Missing required key: {key}")
                return False

        return True
    