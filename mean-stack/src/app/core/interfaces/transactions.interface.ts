export interface Transaction {
  _id: string;
  date: string;
  sender: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    IDNumber: string;
    _id: string;
  };
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    bank: string;
    _id: string;
  };
  amount: string;
  currency: string;
  comments: string;
  status: string;
}

export interface TransactionsResponse {
  getAllTransactions: Transaction[];
}

export interface createAndUpdateTransactions {
  date: string;
  sender: {
    firstName: string;
    lastName: string;
  };
  recipient: {
    firstName: string;
    lastName: string;
  };
  amount: string;
  currency: string;
  comments: string;
  status: string;
}
