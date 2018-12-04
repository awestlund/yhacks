import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mover',
  templateUrl: './mover.component.html',
  styleUrls: ['./mover.component.css']
})
export class MoverComponent implements OnInit {
  componentState:string = "awaitingStart";
  clientReady: string = null;
  location:{long: string; lat:string} = {long:null,lat:null};

  constructor(private server: ServerConnectionService) { }

  ngOnInit() {
  }

  public startCarSearch()
  {
    this.componentState = "searchingForCars";
    this.searchCars();
  }

  private searchCars()
  {
    let x = this.requestWaitingOwners().subscribe(res => {
      this.clientReady = JSON.parse(res['_body']).clientid;
      if(this.clientReady)
      {
        console.log("Found:" + this.clientReady);
        this.componentState = "driving";
        this.getLocation();
        //this.getVehicleInfo();
      }
      else
      {
        // Implement loop & delay here...
      }
    }, err => {
      console.log(err);
    });
  }

  public unlock()
  {
    let x = this.requestUnlock().subscribe(res => {
      console.log(JSON.parse(res['_body']));
    }, err => {
      console.log(err);
    });
  }

  private requestUnlock()
  {
    return new Observable((observer) => {
      this.server.unlockVehicle(this.clientReady).subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }

  // Currently Implemented As A Database Query Only
  getVehicleInfo() {
    let x = this.requestVehicleInfo().subscribe(res => {
      console.log(JSON.parse(res['_body']));
    }, err => {
      console.log(err);
    });
  }

  private requestVehicleInfo()
  {
    return new Observable((observer) => {
      this.server.getVehicleInfo(this.clientReady).subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }

  private requestWaitingOwners()
  {
    return new Observable((observer) => {
      this.server.getWaitingOwners().subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }

  getLocation() {
    let x = this.requestLocation().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.location = JSON.parse(res['_body']);
    }, err => {
      console.log(err);
    });
  }

  private requestLocation()
  {
    return new Observable((observer) => {
      this.server.getLocation(this.clientReady).subscribe(resp => {
        return observer.next(resp);
      }, err => {
        return observer.error(err);
      });
    })
  }

}
