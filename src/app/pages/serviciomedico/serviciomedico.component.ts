import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

//SweetAlert
//import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";

import { FormGroup, FormControl, Validators } from "@angular/forms";
//Importante para que liste
import { CommonModule } from "@angular/common";

//Service
import { MascotaService } from "../../services/mascotas.service";
import { CitasServices } from "../../services/citas.service";
import { UsuarioService } from "../../services/usuario.service";


import { Router } from '@angular/router';

@Component({
  selector: "app-serviciomedico",
  templateUrl: "./serviciomedico.component.html",
  styles: [],
  providers: [UsuarioService, CitasServices, MascotaService],
})
export class ServiciomedicoComponent implements OnInit {
  model: NgbDateStruct;
  //Instanciamos el formulario
  formularioCitas: FormGroup;
  //Creamos el arreglo para las carpetas
  citas = [];
  nombre: any;
  animales: [];

  //La respuesta status
  public status: String;
  public token;
  public id_cargarStorage;

  constructor(
    private _citasService: CitasServices,
    private _userService: UsuarioService,
    private _mascotaService: MascotaService,
    private router: Router
  ) {
    this.token = this._userService.getToken();
    this.id_cargarStorage = this._userService.storage();
  }

  ngOnInit(): void {
    this.listarCitas();
    this.formularioCitas = new FormGroup({
      citamedica: new FormControl(null),
      citavacunacion: new FormControl(null),
      citadesparacion: new FormControl(null),
      citabano: new FormControl(null),
      citacortecabello: new FormControl(null),
      fecha: new FormControl(null, Validators.required),
    });
  }

  listarCitas() {
    this._citasService.listarCitas(this.token).subscribe((resp: any) => {
      //console.log(resp);
      if (resp.success == "true") {
        this.citas = resp.services;
        //console.log(this.citas);
      }
    });
  }

  registrarCita() {
    //console.log(this.formularioCitas.value);
    let nombre = [];
    if (this.formularioCitas.value.citamedica == true) {
      this.nombre = "Cita Medica";
    }
    if (this.formularioCitas.value.citavacunacion == true) {
      this.nombre = "Cita Vacunacion";
    }
    if (this.formularioCitas.value.citadesparacion == true) {
      this.nombre = "Cita Desparacitación";
    }
    if (this.formularioCitas.value.citabano == true) {
      this.nombre = "Cita Bano";
    }
    if (this.formularioCitas.value.citacortecabello == true) {
      this.nombre = "Cita Corte de Cabello";
    }

    var fecha = this.formularioCitas.value.fecha;

    if (fecha == "" || fecha == null) {
      Swal.fire({
        icon: "error",
        title: "La fecha es obligatoria!",
      });
    }

    let params = [
      {
        nombre: this.nombre,
        fecha: fecha.year + "-" + fecha.month + "-" + fecha.day,
      },
    ];
    let datos = params[0];

    this._citasService.registerCita(this.token, datos).subscribe(
      (response) => {
        console.log(response);
        if (response.status == "success") {
          this.status = "success";
          Swal.fire("Cita guardada con exito!", "success");
          //Resetear, formulario
          this.formularioCitas.reset();
          this.router.navigate(["/servicios"]);
          this.listarCitas();
        } else {
          Swal.fire({
            icon: "error",
            title: response.message,
          });
        }
      },
      (error) => {
        //console.log(<any>error.status);
        if (<any>error.status == 500) {
          this.status = "error";
          Swal.fire({
            icon: "error",
            title: "Ya se encuentra registrado",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ya se encuentra registrado",
          });
        }
      }
    );
  }

  eliminarCita(cita) {
    console.log(cita);
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si!!!",
      cancelButtonText: "No, cancelar!",
    }).then((borrar) => {
      if (borrar.value == true) {
        this._citasService.eliminarCita(this.token, cita).subscribe((resp: any) => {
            if (resp.success == 'true') {
              Swal.fire("Borrado correctamente!", "success");
              this.listarCitas();
            }
          });
      }
    });
  }
}
