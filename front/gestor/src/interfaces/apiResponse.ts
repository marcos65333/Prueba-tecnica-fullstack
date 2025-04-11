
// Definir una respuesta genérica que pueda usarse con cualquier tipo de datos
export interface IApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
  }
  