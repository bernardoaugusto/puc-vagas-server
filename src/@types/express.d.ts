declare namespace Express {
  export interface Request {
    user: {
      id: string;
      is_contractor: boolean;
      is_teacher: boolean;
      name: string;
    };
  }
}
