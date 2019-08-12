import { Component } from '@angular/core';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'banco';
  clienteForm: Cliente;
  existeCliente: any;

  constructor(private clienteService: ClienteService){
    this.clienteForm = {
      identification: "",
      firstname: "",
      lastname: "",
      birthdate: ""
    };
  }

  createClient(){
    this.clienteService.getCliente(this.clienteForm.identification)
      .subscribe(
        respuesta => {
          this.existeCliente = respuesta;
          if(this.existeCliente.codigo == "200"){
            alert("NO es posible crear el cliente");
          } else {
            alert("Se realiza el registro del cliente");
            this.clienteService.createClient(this.clienteForm)
            .subscribe();      
          }
        },
        error => {
          alert("Se ha producido un error al crear el cliente");
        });
  }
}
