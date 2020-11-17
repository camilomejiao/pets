import { Injectable } from "@angular/core";

//IP global
import { IPGLOBAL } from "./global";

//Modelo
import { User } from "./../models/user";

import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import "rxjs/add/operator/map";
import { map } from "rxjs/operator/map";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  public url: String;

  usuario: User;
  token: string;

  constructor(
    private _http: HttpClient, private router: Router
    ) {
    this.url = IPGLOBAL.url;
    this.cargarStorage;
  }

  storage(){
    let token = localStorage.getItem("id");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  guardarStorage(id: string, token: string, usuario: User) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado() {
    this.token = localStorage.getItem("token");
    if (this.token != "") {
      if (this.token.length > 5) {
        return true;
      }
    } else {
      return false;
    }
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  //Funciones o metodos
  register(usuario) {
    let url = this.url + "register";
    return this._http.post(url, usuario).map((resp: any) => {
      return resp;
    });
  }

  login(usuario) {
    let url = this.url + "login";
    return this._http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.user);
      return resp;
    });
  }

  logout() {
    this.usuario = null;
    this.token = "";

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    this.router.navigate(["/login"]);
  }

  listarUsuarios() {
    let url = this.url + "users";
    return this._http.get(url).map((resp: any) => {
      return resp;
    });
  }

  listarUsuario(id) {
    let url = this.url + "users/" + id;
    return this._http.get(url).map((resp: any) => {
      return resp;
    });
  }

}
