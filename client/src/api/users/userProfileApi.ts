import { api, API_URL } from "../api";
import { IUserDto } from "../../interfaces/users/user";
import { IStudentDto } from "../../interfaces/users/student";


export async function getUser() {
    try {
        console.log("Requesting user from URL:", `${API_URL}/user`); 
        const response = await api.get<IUserDto>(`/user`);
        console.log("User data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error);
    }
}



export async function getStudents() {
    try {
        console.log("Requesting students from URL:", `${API_URL}/user/students`); 
        console.log("api", api.get("user/students")); 
        const response = await api.get<IStudentDto[]>("user/students");
        console.log("Students data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting students:", error);
        throw error; 
    }
}