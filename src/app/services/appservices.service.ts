import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

// Observable class extensions
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
// import { Hash } from 'crypto';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppservicesService {

  constructor(private http:Http) { }

  getTxs(address?:string):Observable<string>{
      return this.http.get('https://blockchain.info/multiaddr?active='+address+'&cors=true')
      .map((response:Response) =>{
          return response.json();
      });
  }

  getBalance(address?:string):Observable<string>{
    return this.http.get('https://blockchain.info/balance?active='+address+'&cors=true')
      .map((response:Response)=>{
          return response.json();
      });
  }
}
