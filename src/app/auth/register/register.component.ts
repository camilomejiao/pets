import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

//SweetAlert
//import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";
//Modelo
import { User } from "../../models/user";
//Service
import { UsuarioService } from "../../services/usuario.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UsuarioService]
})
export class RegisterComponent implements OnInit {
  //Instanciamos el formulario
  formularioRegister: FormGroup;
  //La respuesta status
  public status: String;
  //El modelo
  public user: User;

  constructor(
    //private _http: HttpClient,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {
    this.user = new User("", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    //Iniciamos el formulario
    this.formularioRegister = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  registrarUsuario() {
    if (this.formularioRegister.invalid) {
      return;
    }
    //console.log(this.formularioRegister.value);

    this._usuarioService.register(this.formularioRegister.value).subscribe(
      (response) => {
        console.log(response);
        console.log(response.token);
        if (response.status == 'success') {
          this.status = "success";
          Swal.fire("Bienvenido!", "success");
          //Resetear, formulario
          this.formularioRegister.reset();
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
