import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

//SweetAlert
import Swal from "sweetalert2";
//Modelo


//Service
import { MascotaService } from "../../services/mascotas.service";
import { UsuarioService } from "../../services/usuario.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ["./mascotas.component.css"],
  providers: [UsuarioService,MascotaService]
})
export class MascotasComponent implements OnInit {

  //Instanciamos el formulario
  formularioMascota: FormGroup;
  //La respuesta status
  public status: String;
  public token;

  constructor(
    private _mascotaService: MascotaService,
    private _userService: UsuarioService,
    private router: Router
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //Iniciamos el formulario
    this.formularioMascota = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      edad: new FormControl(null, [Validators.required, Validators.email]),
      tamano: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
    });
    //console.log(this.token);
  }

  registrarMascota(){
    //console.log(this.formularioMascota.value);
    //console.log(this.token);

    //if (this.formularioMascota.invalid) {
      //return;
    //}

    this._mascotaService.registerPet(this.token, this.formularioMascota.value).subscribe(
      (response) => {
        console.log(response);
        if (response.status == 'success') {
          this.status = "success";
          Swal.fire("Registrado con exito!", "success");
          //Resetear, formulario
          this.formularioMascota.reset();
          this.router.navigate(["/dashboard"]);
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
      });

  }

}
