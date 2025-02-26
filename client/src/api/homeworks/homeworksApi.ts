import { api } from "../api";
import { IHomeworkDto, ISubjectDto } from "../../interfaces/homeworks";

const HOMEWORKS = 'Homework'

export async function getAllHomeworks() {
    try {
        const response = await api.get<IHomeworkDto[]>(`${HOMEWORKS}/list`);
        console.log('api: ', api)
        return response.data;
    } catch (error) {
        console.error("Error getting homeworks:", error);
    }
}

export async function getAllSubjects() {
    try {
        const response = await api.get<ISubjectDto[]>(`${HOMEWORKS}/subjects`);
        return response.data;
    } catch (error) {
        console.error("Error getting subjects:", error);
    }
}