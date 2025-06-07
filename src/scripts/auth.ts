import { LoginProps } from "../types/auth-types";
import axios from "axios";
import { ApiUrl } from "./api-url";
import { User } from "../types/user-types";
import CustomError from "../utils/custom-error";

export async function handleLogin({login, password}: LoginProps): Promise<User> {
    try {
        const result = await axios.post(ApiUrl("/ub/ead-ub/profile"), {
            login,
            password,
          });

        if (result.status === 200) {
            const data: User = {
                ...result.data.data,
                authorization: {
                    login: login,
                    password: password,
                }
            };
            return data;
        } else {
            throw new CustomError("Falha ao realizar login. Verifique suas credenciais.", "Error Login");
        }
    } catch (error) {
        console.log("error", error);
        throw new CustomError(
            "Falha ao realizar login. Verifique suas credenciais.",
            "Error Login",
        );
    }
}