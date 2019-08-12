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
  insertado: any;
  model: any;
  edadValida: boolean = true;
  esNumero: boolean = true;
  fechaActual: any;

  constructor(private clienteService: ClienteService){
    this.fechaActual = new Date();
    this.model = {
      year: this.fechaActual.getFullYear(),
      month: this.formatValueDate(this.fechaActual.getMonth() + 1),
      day: this.formatValueDate(this.fechaActual.getDate())
    };
    this.clienteForm = {
      identification: "0",
      firstname: "",
      lastname: "",
      birthdate: ""
    };
  }

  formatValueDate(numero){
    if(numero.length < 2) {
      return "0" + numero;
    } else {
      return numero;
    }
  }

  validarEdad(){
    if(this.model.year != ""){
      var dateClient = new Date(this.model.year + 18, this.model.month - 1, this.model.day);
      var actualDate = new Date();

      //console.log(dateClient);
      //console.log(actualDate);
      if(dateClient < actualDate) {
        console.log("Es mayor de edad");
        this.clienteForm.birthdate = "" + this.formatValueDate(this.model.day) 
          + "-" + this.formatValueDate(this.model.month) 
          + "-" + this.model.year;
        this.edadValida = true;
        //return true;
      } else {
        console.log("Es menor de edad");
        this.edadValida = false;
        //return false;
      }
    } else {
      this.edadValida = false;
    }
  }
  
  validarNumero(){
    if(this.clienteForm.identification != ""){
      if(this.clienteForm.identification.match(/^[0-9]*$/)){
        this.esNumero = true;
      } else {
        this.esNumero = false;
      }
    }
  }

  createClient(){
    this.validarEdad();
    if(this.edadValida){
      this.clienteService.getCliente(this.clienteForm.identification)
      .subscribe(
        respuesta => {
          this.existeCliente = respuesta;
          if(this.existeCliente.codigo == "200"){
            //alert("Este número de identificación ya se encuentra registrado");
            swal("Ups!", 
              "Este número de identificación ya se encuentra registrado",
              "warning");
          } else {
            //alert("Se realiza el registro del cliente");
            this.clienteService.createClient(this.clienteForm)
            .subscribe(
              respuesta => {
                this.insertado = respuesta;
                if(this.insertado.codigo == "201"){
                  swal("Cliente registrado", 
                  "Se realiza el registro del cliente",
                  "success");  
                } else {
                  swal("Error", 
                  "Se produjo un error en el servicio al registrar el cliente",
                  "error");     
                }
              },
              error => {
                swal("Error", 
                "Se produjo un error en el servicio al registrar el cliente",
                "error");         
              }
            );          
          }
        },
        error => {
          //alert("Se produjo un error en el servicio al consultar el cliente");
          swal("Error", 
          "Se produjo un error en el servicio al consultar el cliente",
          "error");           
        });
    } else {
      swal("Ups!", 
      "Debes ser mayor de 18 años para continuar",
      "warning");  
    }
  }
}
