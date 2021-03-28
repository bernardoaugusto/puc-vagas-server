declare namespace Express {
  export interface Request {
    user: {
      id: string;
      is_contract: boolean;
      is_teacher: boolean;
    };
  }
}
