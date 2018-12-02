import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  constructor(private http: Http) { }

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
