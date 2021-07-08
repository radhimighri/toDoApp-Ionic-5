import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators'
// import { TOdo } from 'src/app/shared/todo';

// const Todos : TOdo[] = [
//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },


//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },


//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },

//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },

//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },

//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },

//   {
//     title : 'title',
//     desc:  'description',
//     date : new Date()
//   },
// ]

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private baseURL = 'http://localhost:3000'

  private  navParams : any = {};

  constructor(
    private http: HttpClient
  ) { }


  getParams() {
    return this.navParams;
  }


  setParams(body) {
    this.navParams = body;
  }

  // getData() {
  //   return Todos;
  // }

  getData(endPoint: string) {
    return this.http.get(this.baseURL + endPoint)
    .pipe(take(1))

  }

  // postData() {
  //   throw new Error("method not implemented");
  // }

  postData(endPoint: string, body: any) {
    return this.http.post(this.baseURL + endPoint, body)
    .pipe(take(1))

  }

  // updateData() {
  //   throw new Error("method not implemented");
  // }

  updateData(endPoint: string, body: any) {
    return this.http.put(this.baseURL + endPoint, body)
    .pipe(take(1))
  }

  // deleteData() {
  //   throw new Error("method not implemented");
  // }

  deleteData(endPoint: string) {
    return this.http.delete(this.baseURL + endPoint)
    .pipe(take(1))

  }
}
