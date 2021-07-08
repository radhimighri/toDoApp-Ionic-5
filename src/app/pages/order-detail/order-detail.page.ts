import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { TOdo } from 'src/app/shared/todo';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit , OnDestroy{

  todo : TOdo;

  constructor(
    private dataService : DataService
  ) { }

  ngOnInit() {
    this.todo = this.dataService.getParams().todo;
  }

  ngOnDestroy() {
    this.dataService.setParams({});
  }

}
