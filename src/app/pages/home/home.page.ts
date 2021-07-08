import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { TOdo } from 'src/app/shared/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todos : TOdo[];
  loading : boolean;
  err : string
  page: number = 1

  constructor(
    private navCtrl : NavController,
    private alertCtrl : AlertController,
    private dataService : DataService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.getData();
  }


  creatTodo() {
    this.navCtrl.navigateForward('/order-config');
  }


  getData(ev?: any) {

    if (!ev) this.loading = true;
    //  setTimeout(() => {
    //   this.loading = false;
    //   this.todos = this.dataService.getData();
    // },3000);

    this.dataService.getData(`/todos?_page=${this.page}`)
    .subscribe((res: TOdo[]) => {
      ev ? ev.target.complete() : this.loading = false
      this.todos = this.page > 1 ? this.todos.concat(res) : res
    }, e => {
      ev ? ev.target.complete() : this.loading = false
      this.err = e.message
    })
  }

  trackFn(todo: TOdo) {
    return todo.id
  }


  detail(todo : TOdo) {
    this.dataService.setParams({
      todo 
    });
    this.navCtrl.navigateForward('/order-detail');
  }


  async confirmDelete(index : number) {
    let alert = await this.alertCtrl.create({
      header : 'Confirm Deleting',
      message : 'Are you sure for deleting ?',
      mode : 'ios',
      buttons : [
        {
          text : 'No',
          role : 'cancel'
        },
        {
          text : 'yes',
          handler : () => {
            console.log('delete todo');
            this.delete(index)
          }
        }
      ]
    });

    await alert.present();
  }


   async delete(index: number) {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.dataService.deleteData('/todos/' + this.todos[index].id)
      .subscribe(async res => {
        await loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: 'deleted successfully'
        });
        await toast.present();
        this.todos.splice(index, 1);
      }, async e => {
        await loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: e.message
        });
        await toast.present();
      })
  }


  edit(todo : TOdo) {
    this.dataService.setParams({
      todo 
    });

    this.navCtrl.navigateForward('/order-config');
  }


  refreshPage(ev) {
    // setTimeout(() => {
    //   this.todos = this.dataService.getData();
    //   ev.target.complete();
    // },3000);
    
  } 

  loadData(ev) {
    // setTimeout(() => {
    //   this.todos = this.todos.concat(this.dataService.getData());
    //   ev.target.complete();
    // }, 3000);

    this.page += 1
    this.getData(ev)
  }

}
