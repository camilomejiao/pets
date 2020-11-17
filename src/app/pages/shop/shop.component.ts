import { Component, OnInit } from '@angular/core';

//SweetAlert
import Swal from "sweetalert2";

//Importante para que liste
import { CommonModule } from "@angular/common";

//Service
import { TiendaServices } from "../../services/tienda.service";
import { UsuarioService } from "../../services/usuario.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  productos = [];

  //La respuesta status
  public status: String;
  public token;

  constructor(
    private _tiendaService: TiendaServices,
    private _userService: UsuarioService,
    private router: Router
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.listarTienda();
  }

  listarTienda() {
    this._tiendaService.listarProductos(this.token).subscribe((resp: any) => {
      console.log(resp);
      if (resp.success == "true") {
        this.productos = resp.shop;
        //console.log(this.citas);
      }
    });
  }
}
