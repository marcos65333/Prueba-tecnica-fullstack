import {ITechnology} from "./technology";

export interface IProject {
    project_id: number;
    title: string;
    responsible: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    technologies_used:ITechnology[];
}

