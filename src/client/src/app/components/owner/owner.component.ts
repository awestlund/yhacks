import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../services/server-connection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  loginUrl;
  variable;
  clientid:string = this.server.clientid;
  componentState:string = "awaitingConfirm";
  location;

  constructor(private server: ServerConnectionService) {
    /*
    this.variable = this.testGet().subscribe(res => {
      console.log(JSON.parse(res['_body']).test);
      this.example = JSON.parse(res['_body']).test;
    }, err => {
      console.log(err);
    });*/

    this.variable = this.getLoginUrl().subscribe(res => {
      console.log(JSON.parse(res['_body']).url);
      this.loginUrl = JSON.parse(res['_body']).url;
    }, err => {
      console.log(err);
    });
  }

  /*
  testGet() {
    return new Observable((observer) => {
      this.server.test().subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }
  */

  getLoginUrl() {
    return new Observable((observer) => {
      this.server.getLoginUrl().subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }

  public parkMe()
  {
    let x = this.requestPark().subscribe(res => {
      console.log(JSON.parse(res['_body']).result.data);
      this.location = JSON.parse(res['_body']).result.data;
      this.componentState = "awaitingDriver";
    }, err => {
      console.log(err);
    });
  }

  private requestPark() {
    return new Observable((observer) => {
      this.server.parkRequest(this.clientid).subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }

  ngOnInit() {
  }
}
