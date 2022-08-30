import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PredictModel } from 'src/app/models/PredictModel';
import { NotificationService } from 'src/app/notification.service';
import { PredictionService } from 'src/app/services/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})

export class PredictionComponent implements OnInit {
  angForm: FormGroup | any;
  static nonZero(control: AbstractControl ):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonZero: true};
    } else {
      return null;
    }
  }
  positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const isNotOk = Number(control.value) < 0;
      return isNotOk ? { nonPositive: { value: control.value } } : null;
    };}
  constructor(private fb: FormBuilder,public predictionService:PredictionService,public notificationService:NotificationService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.angForm = this.fb.group({
       likes: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator(),Validators.pattern(/^[0-9]\d*$/) ]) ],
       posts: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator(),Validators.pattern(/^[0-9]\d*$/)  ]) ],
		   comments: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator(),Validators.pattern(/^[0-9]\d*$/)  ]) ],
		   retweets: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator(),Validators.pattern(/^[0-9]\d*$/)  ]) ],
       interets: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator(),Validators.max(100),Validators.pattern(/^[0-9]\d*$/)  ]) ],
       open: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator() ]) ],
       low: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator() ]) ],
       volume: ['', Validators.compose([
        Validators.required, this.positiveNumberValidator() ,Validators.pattern(/^[0-9]\d*$/) ]) ],
       
    });
  }
  onSubmit(){
    let predictValue=new PredictModel()
    predictValue.likes=this.angForm.get(["likes"]).value
    predictValue.comments=this.angForm.get(["comments"]).value
    predictValue.retweets=this.angForm.get(["retweets"]).value
    predictValue.posts=this.angForm.get(["posts"]).value
    predictValue.interest=this.angForm.get(["interets"]).value
    predictValue.open=this.angForm.get(["open"]).value
    predictValue.low=this.angForm.get(["low"]).value
    predictValue.volume=this.angForm.get(["volume"]).value
    console.log(predictValue)
    try{
      this.predictionService.predict(predictValue).subscribe((res:any)=>{
        console.log(res)
        if(res=="0"){
          this.notificationService.showInfo("Cardano (ADA-USD) Prcice will increase",":)")
        }
        else{
          if(res=="1"){
            this.notificationService.showWarning("Cardano (ADA-USD) Prcice will decrease",":(")
          }
          else{
            this.notificationService.showError("Check values","Error")
          }

        }
      })

    }catch{
      this.notificationService.showError("Check values","Error")

    }
    
    
    

  }
  

}
