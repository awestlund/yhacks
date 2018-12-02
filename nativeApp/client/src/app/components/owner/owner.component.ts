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
  componentState:string = "awaitingRequest";

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
      console.log(JSON.parse(res['_body']));
    }, err => {
      console.log(err);
    });
  }

  public getLocation()
  {
    let x = this.requestLocation().subscribe(res => {
      console.log(JSON.parse(res['_body']));
    }, err => {
      console.log(err);
    });
  }

  private requestLocation() {
    return new Observable((observer) => {
      this.server.locationRequest(this.clientid).subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
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
