import { Component } from '@angular/core';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'banco';
  clienteForm: Cliente;
  existeCliente: any;
  errores: any;

  constructor(private clienteService: ClienteService){
    this.errores = {};
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
            //alert("NO es posible crear el cliente");
            swal("Error", 
              "NO es posible crear el cliente",
              "error");
          } else {
            //alert("Se realiza el registro del cliente");
            this.clienteService.createClient(this.clienteForm)
            .subscribe();
            swal("Cliente registrado", 
              "Se realiza el registro del cliente",
              "success");            
          }
        },
        error => {
          //alert("Se ha producido un error al consultar el cliente");
          swal("Error", 
          "Se ha producido un error al consultar el cliente",
          "error");           
        });
  }
}
