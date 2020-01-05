export interface registerUser {
  name: string;
  username: string;
  password: string;
  email: string;
  register_date?: Date;
}

export interface loginUser {
  username: string;
  password: string;
}