import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

import { CrudStatusLabel } from '../enuns/status.enum';
import { ProductModel } from '../product.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  cruds!: ProductModel[];


  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.cruds = this.crudService.listar()
  }
  listar(): ProductModel[] {
    return this.cruds;
  }

  remover(id:string): void {
    this.crudService.remover(id);
  }

  crudStatusLabel(status:number):string {
    return CrudStatusLabel.get(status)!;
  }
  alterarStatus() {}
  editar() {}

}
