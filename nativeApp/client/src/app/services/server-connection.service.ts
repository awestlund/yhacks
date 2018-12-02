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

  makeGetRequest(url: string, port: string, action: string, paramName?: string, paramValue?: string)
  {
    if(paramName && paramValue)
    {
      return "http://"+url+":"+port+"/"+action+"?"+paramName+"="+paramValue;
    }
    else
    {
      return "http://"+url+":"+port+"/"+action;
    }
  }

  getLoginUrl()
  {
    return this.http.get("http://localhost:8000/login");
  }

  test()
  {
    this.makeGetRequest("localhost", "8000", "test", "name", "julian")
    return this.http.get("http://localhost:8000/test?name=julian");
  }
}
