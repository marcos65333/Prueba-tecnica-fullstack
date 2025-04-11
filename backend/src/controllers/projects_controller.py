from src.models.projects import Projects_model

# This is a controller class for managing projects.
# It interacts with the Projects_model to perform CRUD operations on projects.
class Projects_controller:
    def __init__(self):
        self.model = Projects_model()
    
    # Method to create a new project
    def create_project(self, data:dict):
        return self.model.create(data)

    # Method to get all projects
    def get_all_projects(self):
        return self.model.get_projects()

    # Method to update a project by ID
    def update_project(self, project_id:int, data:dict):
        return self.model.update_project(project_id, data)
    
    # Method to update the status of a project by ID
    def update_status_project(self, project_id:int, status:str):
        return self.model.update_status_project(project_id, status)