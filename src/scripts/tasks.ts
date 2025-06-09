import { LoginProps } from "../types/auth-types";
import axios from "axios";
import { ApiUrl } from "./api-url";
import CustomError from "../utils/custom-error";
import { Task } from "../types/task-types";

export async function handleTasks({login, password}: LoginProps): Promise<Task[]> {
    try {
        const result = await axios.post(ApiUrl("/ub/ead-ub/tasks"), {
            login,
            password,
          });

        if (result.status === 200) {
            const data: Task[] = result.data.data;
            return data;
        } else {
            throw new CustomError(result.data.errors[0], "Ocorreu um erro ao pegar as tarefas.");
        }
    } catch (error) {
        console.log("error", error);
        throw new CustomError(
            "Error Tasks",
            "Ocorreu um erro interno, tente novamente mais tarde."
        );
    }
}