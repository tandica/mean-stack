import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {


    constructor(private http: HttpClient) { }

    public getTransactions(page, pageSize) {
        return this.http.get('http://localhost:8080/api/transactions'  + '?page=' + page + '&pageSize=' + pageSize);
    }

    public addTransaction(transaction) {
        return this.http.post('http://localhost:8080/api/transactions', transaction);
    }

    public updateTransaction(transaction) {
        return this.http.put(`http://localhost:8080/api/transactions/${transaction._id}`, transaction);
    }

    public deleteTransaction(transaction) {
        return this.http.delete(`http://localhost:8080/api/transactions/${transaction._id}`);
    }

    public getFilters(page, pageSize, filters = {}) {
        const queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
        return this.http.get('http://localhost:8080/api/transactions/filter' + '?page=' + page + '&pageSize=' + pageSize + '&' + queryString);
    }
}   