import { CarImage } from './../../models/carImage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from './../../services/car-image.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {

  imageAddForm:FormGroup

  constructor(
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute

  ) { }
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['carId']){
        this.createImageAddForm(params['carId'])
      }
    })
  }
  createImageAddForm(carid:number){
    this.imageAddForm = this.formBuilder.group({
      carId:carid,
      imagePath:["",Validators.required]

    })
  }

  addImage(){
    if(this.imageAddForm.valid){
      let imageModel:CarImage = Object.assign({},this.imageAddForm.value)
      console.log(imageModel.imagePath)
      this.carImageService.add(imageModel).subscribe(response=>{
        this.toastrService.success(response.message,"Added")
      },responseError=>{
        this.toastrService.error("Image could not be added","Error")
      })
    }
    else{
      this.toastrService.error("No selected file","Error")
    }
  }

}
