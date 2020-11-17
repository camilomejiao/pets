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
export class CitasServices {
  public url: String;

  constructor(private _http: HttpClient, private router: Router) {
    this.url = IPGLOBAL.url;
    //this.cargarStorage;
  }

  //Funciones o metodos
  registerCita(token, cita) {
    let params = JSON.stringify(cita);
    //console.log(params);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    let url = this.url + "saveServices";
    return this._http
      .post(url, params, { headers: headers })
      .map((resp: any) => {
        return resp;
      });
  }

  listarCitas(token) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    let url = this.url + "getServicesCita";
    return this._http.get(url, { headers: headers }).map((resp: any) => {
      return resp;
    });
  }

  eliminarCita(token, cita) {
    let id = cita._id;
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    let url = this.url + "deleteServices/" + id;
    return this._http.delete(url, { headers: headers }).map((resp: any) => {
      return resp;
    });
  }

  updateCita(token, cita) {
    let id = cita._id;
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", token);

    if (id != "" && id != undefined) {
      let url = this.url + "updateServices/" + id;
       return this._http.put(url, { headers: headers }).map((resp: any) => {
         return resp;
       });
    }
  }



}
