import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  clientid:string=this.getClientID();

  constructor(private http: Http, private route: ActivatedRoute) {}
  
  getClientID()
  {
    let url = new URL(window.location.href)
    return url.searchParams.get("clientid");
  }

  parkRequest(id)
  {
    return this.http.get("http://localhost:8000/parkme?clientid="+id);
  }

  getWaitingOwners()
  {
    return this.http.get("http://localhost:8000/readytodrive");
  }

  getVehicleInfo(id)
  {
    return this.http.get("http://localhost:8000/getVehicleInfo?clientid="+id);
  }

  getLocation(id)
  {
    return this.http.get("http://localhost:8000/getLocation?clientid="+id);
  }

  locationRequest(id)
  {
    return this.http.get("http://localhost:8000/getLocation?clientid="+id);
  }

  getLoginUrl()
  {
    return this.http.get("http://localhost:8000/login");
  }

  test()
  {
    return this.http.get("http://localhost:8000/test?name=julian");
  }


}
