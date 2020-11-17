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
export class TiendaServices {
  public url: String;

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.url = IPGLOBAL.url;
    //this.cargarStorage;
  }


  listarProductos(token) {
    let url = this.url + "getShops";
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", token);
    return this._http.get(url, { headers: headers }).map((resp: any) => {
      return resp;
    });
  }

}


