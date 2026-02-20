export interface SignUpState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  values: {
    name?: string;
    email?: string;
    password?: string;
  };
}

export interface SignInState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}
