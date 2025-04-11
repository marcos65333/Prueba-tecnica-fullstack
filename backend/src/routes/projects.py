from src import app,csrf
import os
from flask import  request, jsonify
from src.controllers.projects_controller import Projects_controller

#create projects
@app.route(f"/api/{os.getenv('API_VERSION_V1')}/projects", methods=['POST'])
@csrf.exempt
def create_projects():
    try:
        data = request.get_json(force=True)
        controller_projects = Projects_controller()
        return controller_projects.create_project(data)
    except Exception as e:
        return jsonify({'error': str(e)})
    
#get projects
@app.route(f"/api/{os.getenv('API_VERSION_V1')}/projects", methods=['GET'])
@csrf.exempt
def get_projects():
    try:
        print("get projects")
        controller_projects = Projects_controller()
        return controller_projects.get_all_projects()
    except Exception as e:
        return jsonify({'error': str(e)})
    
#get projects by id
@app.route(f"/api/{os.getenv('API_VERSION_V1')}/projects/<int:id>", methods=['GET'])
@csrf.exempt
def get_projects_by_id(id):
    try:
        return jsonify({'message': 'get projects by id '})
    except Exception as e:
        return jsonify({'error': str(e)})

#update status projects
@app.route(f"/api/{os.getenv('API_VERSION_V1')}/projects/<int:id>/<string:status>", methods=['PUT'])
@csrf.exempt
def update_projects_status(id,status):
    try:
        controller_projects = Projects_controller()
        return controller_projects.update_status_project(project_id=id, status=status)
    except Exception as e:
        return jsonify({'error': str(e)})

#update projects
@app.route(f"/api/{os.getenv('API_VERSION_V1')}/projects/<int:id>", methods=['PUT'])
@csrf.exempt
def update_projects(id):
    try:
        data = request.get_json(force=True)
        controller_projects = Projects_controller()
        return controller_projects.update_project(data=data, project_id=id)
    except Exception as e:
        return jsonify({'error': str(e)})