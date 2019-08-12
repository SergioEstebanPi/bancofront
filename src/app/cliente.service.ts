import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlBanco = "http://bancoback.herokuapp.com/api/v1/client";
  //urlBanco = 'http://localhost:8080/api/v1/client';
  //urlBanco = 'https://testbankapi.firebaseio.com/clients.json';

  constructor(private http:HttpClient) {
  }

  getCliente(id:string) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlBanco}/${id}`);
  }

  createClient(cliente:Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(
      this.urlBanco,
      cliente
    );
  }  

}
