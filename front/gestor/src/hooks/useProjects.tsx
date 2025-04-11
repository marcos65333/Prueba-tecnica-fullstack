import React, { useState, useEffect } from "react";
import { IProject } from "../interfaces/projects";
import { create, getAll, updateStatus, update } from "../services/projects";

export const useProjects = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAllProjects = async (setResponse: React.Dispatch<React.SetStateAction<IProject[]>>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAll();
            if (res.success) {
                   setResponse(res.data);
            } else {
                setError(res.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const createProject = async (project: IProject) => {
        setLoading(true);
        setError(null);
        try {
            const res = await create(project);
            if (res.success) {
               setResponse(res.data);
            } else {
                setError(res.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const changeStatus = async (projectId: number, status: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateStatus(projectId, status);
            if (res.success) {
                setResponse(res.data);
            } else {
                setError(res.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateProject = async (projectId: number, project: IProject) => {
        setLoading(true);
        setError(null);
        try {
            const res = await update(projectId, project);
            if (res.success) {
                setResponse(res.data);
            } else {
                setError(res.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    return {loading, response, error, getAllProjects, createProject, changeStatus, updateProject};
}