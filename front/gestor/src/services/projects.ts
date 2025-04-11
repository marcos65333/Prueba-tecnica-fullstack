import { endPoint } from "../config/endpoint";
import axios from "axios";
import { IApiResponse } from "../interfaces/apiResponse";
import { handleApiError, getHeaders } from "../config/apiConfig";
import { IProject } from "../interfaces/projects";

// Function to create a new project
async function create(project: IProject): Promise<IApiResponse<IProject>> {
  try {
    const response = await axios.post(`${endPoint()}/projects`, project, {
      headers: getHeaders(),
    });

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: unknown) {
    return handleApiError(error, "Error al crear el proyecto");
  }
}

// Function to get all projects
async function getAll(): Promise<IApiResponse<IProject[]>> {
  try {
    const response = await axios.get(`${endPoint()}/projects`, {
      headers: getHeaders(),
    });
    console.log(response.data);

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: unknown) {
    console.log(error);
    return handleApiError(error, "Error al obtener los proyectos");
  }
}

// Function to update a project
async function updateStatus(
  projectId: number,
  status: string
): Promise<IApiResponse<IProject>> {
  try {
    const response = await axios.put(
      `${endPoint()}/projects/${projectId}/${status}`,

      { headers: getHeaders() }
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: unknown) {
    return handleApiError(error, "Error al actualizar el proyecto");
  }
}

// Function to update a project
async function update(
  projectId: number,
  project: IProject
): Promise<IApiResponse<IProject>> {
  try {
    const response = await axios.put(
      `${endPoint()}/projects/${projectId}`,project,
      { headers: getHeaders() }
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: unknown) {
    return handleApiError(error, "Error al actualizar el proyecto");
  }
}

export { create, getAll, updateStatus, update };
