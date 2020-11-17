import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

//SweetAlert
import Swal from "sweetalert2";

//Modelo
import { User } from "../../models/user";
//Service
import { UsuarioService } from "../../services/usuario.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { element } from "protractor";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  //La respuesta status
  public status: String;

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
     //Iniciamos el formulario
    this.formularioLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    if (this.formularioLogin.invalid) {
      return;
    }
    //console.log(this.formularioLogin.value);
    this._usuarioService.login(this.formularioLogin.value).subscribe(
      response => {
        console.log(response.error);
        if (response.token != '') {
          Swal.fire(
            'Bienvenido!',
            'success'
          )
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire({
            icon: "error",
            title: response.error.message,
          });
        }
      },
      error => {
        console.log('False', <any>error);
        if (<any>error.status == 404) {
          this.status = 'error';
          Swal.fire({
            icon: 'error',
            title: 'Error en la autenticación usuario y contraseña incorrectos'
          })
        }
      }
    );

  }


}
