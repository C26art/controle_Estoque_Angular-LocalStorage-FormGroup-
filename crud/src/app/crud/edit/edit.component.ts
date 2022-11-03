import { ProductModel } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: string;
  crud!: ProductModel;
  crudForm!: FormGroup;
  msg!: string

  constructor(private route: ActivatedRoute,
    private service: CrudService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.id = id;

    this.crud = this.service.localizarPortId(id)
    console.log(this.crud);

    this.crudForm = this.formBuilder.group({
      nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]/)]],
    quantidade:['',[Validators.required,Validators.pattern(/[0-9]/)]],
    fornecedor:['',[Validators.required]],
    validade:['',[Validators.required]],
    categoria:['',[Validators.required]],

      status:[
        '',
        [Validators.required]
      ]
    })
    this.loadForm(this.crud);
  }

  editar(): void {
    this.crud.nome = this.crudForm.get('nome')!.value;
    this.crud.status = +this.crudForm.get('status')!.value;

    this.service.atualizar(this.crud);
    this.msg = "Atualizado com sucesso!";
  }

  loadForm(crud:ProductModel): void {
    this.crudForm.patchValue({
      nome: crud.nome,
      status: ''+crud.status
    })
  }
  get nomeProduto() {return this.crudForm.get('nome')!;}
}
