import axios from 'axios';
import { client } from './config';

export interface CalculoAdicionalNoturnoRequest {
  horasTrabalhadasSemAdicionalNoturno: string;
  horasNoturnas: string;
}

export interface CalculoAdicionalNoturnoResponse {
  horasTrabalhadasSemAdicionalNoturno: string;
  horasNoturnas: string;
  horasNoturnasConvertidas: string;
  totalFinal: string;
  horasNoturnasConvertidasEmHoras: number;
  totalFinalEmHoras: number;
}

type ApiErrorPayload = {
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
};

export const calcularAdicionalNoturno = async (
  payload: CalculoAdicionalNoturnoRequest,
): Promise<CalculoAdicionalNoturnoResponse> => {
  try {
    const response = await client.post<CalculoAdicionalNoturnoResponse>(
      '/api/AdicionalNoturno/calcular',
      payload,
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiErrorPayload | string | undefined;
      const firstValidationMessage =
        data && typeof data === 'object' && data.errors
          ? Object.values(data.errors).flat().find(Boolean)
          : undefined;

      const message =
        (data && typeof data === 'object' ? data.message || data.title : undefined) ||
        firstValidationMessage ||
        'Não foi possível calcular o adicional noturno.';

      throw new Error(message);
    }

    throw new Error('Não foi possível calcular o adicional noturno.');
  }
};