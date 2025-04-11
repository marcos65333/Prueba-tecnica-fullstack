from flask import jsonify
from src import logger
from src.config.bd_config import connection
from src.models.technologies_used import Technologies_used_model
from src.utils.date_format import parse_http_date

class Projects_model:
    """
    Class to manage the projects table
    """
    
    def __init__(self):
        self.connection = connection
        self.technologies_used_model = Technologies_used_model()
        
    def create(self, data: dict):
        """
        Method to create a new project
        :param data: project data
        :return: ID of the created project
        """
        conn = self.connection()
        cursor = conn.cursor()
        try:
            # Check if the data is valid
            if not self.entries_validate(data):
                return jsonify({"error": "Invalid data format"}), 400
            
            # Check if the project already exists
            if self.verify_if_exists_project(data['title']):
                return jsonify({"error": "Error creating project, already exists"}), 400
            
            sql = "INSERT INTO projects (title, responsible, start_date, end_date,description) VALUES (%s, %s, %s, %s, %s)"
            values = (data['title'], data['responsible'], data['start_date'], data['end_date'], data['description'])
            cursor.execute(sql, values)
            conn.commit()
            project_id = cursor.lastrowid
            self.technologies_used_model.create(data=data['technologies_used'], project_id=project_id)
            cursor.close()
            return jsonify({"message": "Project created successfully", "project_id": project_id}), 201
        except Exception as e:
            logger.error(f"Error creating project: {e}")
            return jsonify({"error": "Error creating project"})
        finally:
            cursor.close()
            conn.close()
            logger.info("Connection closed")
    
    
    def verify_if_exists_project(self, title: str):
        """
        Method to check if a project with the given title already exists
        :param title: project title
        :return: True if it exists, False otherwise
        """
        conn = self.connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT * FROM projects WHERE title = %s", (title,))
            project = cursor.fetchone()
            cursor.close()
            return project is not None
        except Exception as e:
            logger.error(f"Error checking project existence: {e}")
            return False
        finally:
            cursor.close()
            conn.close()
            logger.info("Connection closed")
    
    def get_projects(self):
        """
        Method to retrieve all projects
        :return: list of projects
        """
        conn = self.connection()
        cursor = conn.cursor()
        try:
            projects = []
            cursor.execute("SELECT * FROM projects")
            for project in cursor:
                project_dict = {
                    "project_id": project[0],
                    "title": project[1],
                    "description": project[2],
                    "responsible": project[3],
                    "start_date": project[4],
                    "end_date": project[5],
                    "created_at": project[6],
                    "updated_at": project[7],
                    "status": project[8],
                    "technologies_used": self.technologies_used_model.get_all_by_project_id(project[0])
                }
                projects.append(project_dict)
            cursor.close()
            return jsonify(projects)
        except Exception as e:
            logger.error(f"Error retrieving projects: {e}")
            return jsonify({"error": "Error retrieving projects"})
        finally:
            cursor.close()
            conn.close()
            logger.info("Connection closed")
    
    #update status project
    def update_status_project(self, project_id: int, status: str):
        """
        Method to update the status of a project
        :param project_id: project ID
        :param status: new status
        :return: success message
        """
        conn = self.connection()
        cursor = conn.cursor()
        try:
            sql = "UPDATE projects SET status = %s WHERE project_id = %s"
            values = (status, project_id)
            cursor.execute(sql, values)
            conn.commit()
            cursor.close()
            return jsonify({"message": "Project status updated successfully"}), 200
        except Exception as e:
            logger.error(f"Error updating project status: {e}")
            return jsonify({"error": "Error updating project status"})
        finally:
            cursor.close()
            conn.close()
            logger.info("Connection closed")
    
    #update project
    def update_project(self, project_id: int, data: dict):
        """
        Method to update a project
        :param project_id: project ID
        :param data: updated project data
        :return: success message
        """
        conn = self.connection()
        cursor = conn.cursor()
        try:
            data['start_date'] = parse_http_date(data['start_date'])
            data['end_date'] = parse_http_date(data['end_date'])
            sql = "UPDATE projects SET title = %s, responsible = %s, start_date = %s, end_date = %s WHERE project_id = %s"
            values = (data['title'], data['responsible'], data['start_date'], data['end_date'], project_id)
            cursor.execute(sql, values)
            conn.commit()
            cursor.close()
            return jsonify({"message": "Project updated successfully"}), 200
        except Exception as e:
            logger.error(f"Error updating project: {e}")
            return jsonify({"error": "Error updating project"})
        finally:
            cursor.close()
            conn.close()
            logger.info("Connection closed")

    def get_project(self, project_id: int):
        """
        Method to retrieve a project by its ID
        :param project_id: project ID
        :return: project
        """
        conn = self.connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT * FROM projects WHERE id = %s", (project_id,))
            project = cursor.fetchone()
            cursor.close()
            return jsonify(project)
        except Exception as e:
            logger.error(f"Error retrieving project: {e}")
            return jsonify({"error": "Error retrieving project"})
        finally:
            cursor.close()
            conn.close()
            logger.info("Connection closed")
            
    def entries_validate(self, data):
        """
        Validate the entries in the data dictionary.
        """
        if not isinstance(data, dict):
            logger.error("Invalid data format. Expected a dictionary.")
            return False

        required_keys = ['title', 'responsible', 'start_date', 'end_date', 'technologies_used', 'description']
        for key in required_keys:
            if key not in data:
                logger.error(f"Missing required key: {key}")
                return False

        return True
