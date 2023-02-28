export class Transaction {
  _id?: string = '';
  date: string = '';
  sender = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    IDNumber: '',
  };
  recipient = {
    firstName: '',
    lastName: '',
    email: '',
    accountNumber: '',
    bank: '',
  };
  amount: string = '';
  currency: string = '';
  comments: string = '';
  status: string = '';
}
