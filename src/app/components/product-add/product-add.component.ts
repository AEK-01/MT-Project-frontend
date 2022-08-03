import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, Form} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder, 
    private productService:ProductService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductForm();
  }


  createProductForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock:["", Validators.required],
      categoryId:["", Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({},this.productAddForm.value)  
      this.productService.add(productModel).subscribe(data=>{
        this.toastrService.success("Product is added")
      },responserError=>{
        if(responserError.error.Errors)
        {
          if(responserError.error.Errors.length>0){
            for (let i = 0; i < responserError.error.Errors.length; i++) {
              this.toastrService.error(responserError.error.Errors[i].ErrorMessage, "Validation Error");
            }
          }
        }


      })
    }
    else{
      this.toastrService.error("Form is not valid")
    }
    
  }




}
