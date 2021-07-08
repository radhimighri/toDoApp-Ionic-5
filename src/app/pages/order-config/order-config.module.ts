import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfigPageRoutingModule } from './order-config-routing.module';

import { OrderConfigPage } from './order-config.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OrderConfigPageRoutingModule
  ],
  declarations: [OrderConfigPage]
})
export class OrderConfigPageModule {}
