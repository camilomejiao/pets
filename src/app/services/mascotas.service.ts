import { Injectable } from "@angular/core";

//IP global
import { IPGLOBAL } from "./global";

import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import "rxjs/add/operator/map";
import { map } from "rxjs/operator/map";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class MascotaService {
  public url: String;

  constructor(private _http: HttpClient, private router: Router) {
    this.url = IPGLOBAL.url;
    //this.cargarStorage;
  }

  //Funciones o metodos
  registerPet(token, mascota) {
    let params = JSON.stringify(mascota);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    let url = this.url + "savePets";
    return this._http
      .post(url, params, { headers: headers })
      .map((resp: any) => {
        return resp;
      });
  }

  listarPet(token) {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", token);
    let url = this.url + "getPets";
    return this._http.get(url, { headers: headers }).map((resp: any) => {
      return resp;
    });
  }
}
