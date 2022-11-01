import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

import { ProductStatus } from '../crud/enuns/status.enum';
import { ProductModel } from '../crud/product.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() { }

  cadastrar(crud: ProductModel): void {
    let cruds:ProductModel[] = this.listar();
    crud.id = uuid.v4();
    cruds.push(crud);
    console.log(cruds);
    localStorage.setItem('cruds', JSON.stringify(cruds));

  }

  atualizar(crud: ProductModel): void {
    let cruds:ProductModel[] = this.listar();

    for(let i = 0; i < cruds.length; i++) {
      if(crud.id === cruds[i].id) {
        cruds[i] = crud;
      }
    }
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }

  localizarPortId(id:string): ProductModel {
    const cruds:ProductModel[] = this.listar();
    let crud!:ProductModel;
    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id === id) {
        crud = cruds[i];
        break;
      }
    }
    return crud;
  }

  listar(): ProductModel [] {
    //return JSON.parse(localStorage.getItem('cruds') || '{}') ?? [];
     return JSON.parse(localStorage.getItem('cruds')!) as ProductModel[] ?? [];
  }

  remover(id: string): void {
    let cruds:ProductModel[] = this.listar();

    let novoCruds: ProductModel[] = [];
    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id !== id) {
        novoCruds.push(cruds[i]);
      }
    }
    cruds = novoCruds;
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }

  alteraStatus(id:string, status:ProductStatus) {
    const cruds:ProductModel[] = this.listar();

    for(let i = 0; i < cruds.length; i++) {
      if(cruds[i].id === id) {
        cruds[i].status = status;
        if(status === ProductStatus.CONCLUIDO) {
          cruds[i].validade = new Date();
        }
        break;
      }
    }
    localStorage.setItem('cruds', JSON.stringify(cruds));
  }
}
