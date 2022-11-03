import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
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
  displayedColumns: string[] = ['nome', 'status', 'quantidade', 'fornecedor', 'validade', 'categoria', 'edit', 'remove'];
  dataSource!: MatTableDataSource<ProductModel>;

  clickedRow!: ProductModel;


  constructor(private crudService: CrudService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,) {
      this.matIconRegistry.addSvgIcon(
        "kickstarter",
        this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icones/kickstarter.svg"))
     }

  ngOnInit(): void {
    this.cruds = this.crudService.listar();
    this.dataSource = new MatTableDataSource(this.cruds);
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
  alterarStatus(id:string) {}
  editar(id:string) {}

}
