import { Component } from '@angular/core';
import { ServerConnectionService } from './services/server-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  page = "home";

  constructor(private server: ServerConnectionService){
    this.checkClientID();
  }

  checkClientID()
  {
    if(this.server.clientid)
    {
      console.log(this.server.clientid);
      this.page="owner";
    }
    else{
      console.log("No Client ID - New User")
    }
  }
}
