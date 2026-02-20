export interface AddTransactionState {
  errors: {
    amount?: string[];
    type?: string[];
    category?: string[];
    description?: string[];
    _form?: string[];
  };
}
