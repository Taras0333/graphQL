export type ErrorHandlerType = {
  statusCode?: number;
  code?: number;
  kind?: string;
  errors?: {
    password?: {
      path: string;
      properties: {
        message: string;
      };
    };
  };
} & Error;
