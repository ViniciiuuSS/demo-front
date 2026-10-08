import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Model/ClienteModel';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private urlAPI = 'http://localhost:8080/api/clientes';
    constructor(private http: HttpClient) {}

    getClientes(){
        return this.http.get<Cliente[]>(this.urlAPI);
    }

    getClienteByCpf(cpf: string){
        return this.http.get<Cliente>(`${this.urlAPI}/${cpf}`);
    }

    postCliente(cliente: Cliente){
        return this.http.post<Cliente>(this.urlAPI, cliente);
    }

    putCliente(cliente: Cliente){
        return this.http.put<Cliente>(`${this.urlAPI}/${cliente.clicod}`, cliente);
    }

    deleteCliente(cpf: string){
        return this.http.delete(`${this.urlAPI}/${cpf}`);
    }
}
