import { client } from "./config";
import axios from "axios";


export interface ResultadoCalculoDto {
    nomeFuncionario: string;
    totalHorasTrabalhadas: number;
    totalHorasExtras50: number;
    totalHorasExtras100: number;
    totalHorasNoturnas: number;
}

export const uploadTimeSheet = async (file: File[]): Promise<ResultadoCalculoDto[]> => {
    const formData = new FormData();
    file.forEach((item) => {
        formData.append("file", item);
    });

    console.log(formData)
    try {
        const res = await client.post<ResultadoCalculoDto[]>(
            "/api/folha/importar-planilha",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error uploading timesheet:", error.response?.data?.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};
