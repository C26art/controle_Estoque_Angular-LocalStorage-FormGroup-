import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CrudService } from '../../services/crud.service';
import { ProductStatus } from '../enuns/status.enum';
import { ProductModel } from '../product.model';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  crudForm!: FormGroup;
  msg!: string;


  constructor(private formBuilder: FormBuilder, private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]/)]],
    quantidade:['',[Validators.required,Validators.pattern(/[0-9]/)]],
    fornecedor:['',[Validators.required]],
    validade:['',[Validators.required]],
    categoria:['',[Validators.required]],

    })
  }

  cadastrar() {
    const crud = this.crudForm.getRawValue() as ProductModel;
    crud.validade = new Date();
    crud.status = ProductStatus.PENDENTE
    this.crudService.cadastrar(crud);

    this.msg = "Cadastrado com sucesso!"
  }
  get nomeProduto() {return this.crudForm.get("nome")!}
}
