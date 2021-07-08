import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { TOdo } from 'src/app/shared/todo';

@Component({
  selector: 'app-order-config',
  templateUrl: './order-config.page.html',
  styleUrls: ['./order-config.page.scss'],
})
export class OrderConfigPage implements OnInit {

  form : FormGroup;
  todo : TOdo;

  constructor(
    private fb : FormBuilder,
    private navCtrl : NavController,
    private dataService : DataService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.createForm();
   }

  ngOnInit() {
    this.todo = this.dataService.getParams().todo;
    this.patchForm();
  }

  patchForm() {
    if(this.todo) {
      this.form.patchValue({
        title : this.todo.title,
        desc : this.todo.desc
      })
    }
  }


  createForm() {
    this.form = this.fb.group({
      title : ['' , Validators.required],
      desc : ['' , Validators.required]
    });
  }


  async onSubmit() {
    // console.log(this.form.value);
    let form = this.form.value;
    // if(this.todo) { //edit
    //   this.todo.title = form.title;
    //   this.todo.desc = form.desc;
    //   this.todo.date = new Date();
    // }
    // this.navCtrl.pop();

    let loading = await this.loadingCtrl.create({})
    await loading.present()


    if(this.todo) {
      //editing

      let todo : TOdo = {
        ...form,
        date : new Date()
      }

      // this.dataService.postData('/todos' , todo)
      this.dataService.updateData('/todos/' + this.todo.id , todo)
        .subscribe(async res => {
          await loading.dismiss();
          let toast = await this.toastCtrl.create({
            message : 'saved successfully'
          });
          await toast.present();
          this.navCtrl.pop();
        } , async e => {
          await loading.dismiss();
          let toast = await this.toastCtrl.create({
            message : e.message
          });
          await toast.present();
        });


    } else {
            //adding new toDo
     let todo : TOdo = {
        ...form,
        date : new Date()
      }

      // this.dataService.postData('/todos' , todo)
      this.dataService.postData('/todos' , todo)
        .subscribe(async res => {
          await loading.dismiss();
          let toast = await this.toastCtrl.create({
            message : 'saved successfully'
          });
          await toast.present();
          this.navCtrl.pop();
        } , async e => {
          await loading.dismiss();
          let toast = await this.toastCtrl.create({
            message : e.message
          });
          await toast.present();
        });
    }
  }


}
