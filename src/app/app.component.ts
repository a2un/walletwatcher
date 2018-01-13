import { Component,OnInit } from '@angular/core';
import {AppservicesService} from './services/appservices.service';
import {Sort} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  walletaddr:string;
  txs:any[] = [];
  COLUMNS:string[] = ['To Address','From Address','Amount','Tx Date'];
  walletbalance:string;
  bitcoin:any;

  constructor(private appSvc:AppservicesService){
    //'1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq'
  }

  ngOnInit(){

  }

  textchange(evt){
    // this.txs.push({
    //   "addr": '1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq'
    // })
    console.log("walletwatcher","event",evt);
    this.txs = [];
    this.walletbalance = '';
    if(!(this.walletaddr === undefined) && this.walletaddr.length !=0){
      this.appSvc.getTxs(this.walletaddr).subscribe((results)=>{
        let responsedata = results;
        console.log("walletwatcher","response data",responsedata);
        responsedata["txs"].forEach(outerelement => {
          outerelement.inputs.forEach((inputelem) =>{
              let txObj;
              console.log("walletwatcher","input elem",inputelem);
              txObj = {
                "fromaddr": inputelem["prev_out"].addr
              }
              outerelement.out.forEach((outelem) => {
                let outTxObj;
                console.log("walletwatcher","out elem",outelem);
                  outTxObj = {
                    ...txObj,
                    "datetime":this.getDateTime(outerelement.time),
                    "toaddr": outelem.addr,
                    "amount": this.getamtwithcurrency(outelem.value,responsedata["info"].symbol_btc),
                  }
                  this.txs.push(outTxObj);
              });

          });

          console.log("walletwatcher","txs array",this.txs[0]);
              
        });
      },(error) => {
        this.txs = [];
        this.walletbalance = '';
      }); 
  
      this.appSvc.getBalance(this.walletaddr).subscribe((results:any)=>{
        let responsedata = results;
        console.log("walletwatcher","balance data",responsedata[this.walletaddr]);
        let amt = (!(responsedata[this.walletaddr] === undefined ))?responsedata[this.walletaddr].final_balance: 0;
        this.walletbalance = this.getamtwithcurrency(amt,this.bitcoin);
      },(error) => {
          this.txs = [];
          this.walletbalance = '';
      });
    } 
    else{
      this.txs = [];
      this.walletbalance = '';
    }

    this.txs = this.returnUnique(this.txs);
  }

  returnUnique(arr:any[]):any[]{
    return arr.filter(function(elem, index, self) {
      return index === self.indexOf(elem) && arr[index].datetime === elem.datetime;
    });
  }

  getamtwithcurrency(amount:number,currencyinfo:any):string{
    if(!(currencyinfo === undefined) && !(currencyinfo.code === undefined) && currencyinfo.code.toString().toLocaleLowerCase() === "btc")
        this.bitcoin = currencyinfo;
    else{
        this.bitcoin = {
          "code":"BTC",
          "conversion":100000000,
          "symbol" : "BTC"
        }
    }
    return this.stringformat(amount/currencyinfo.conversion,currencyinfo.symbol.toString());
  }

  stringformat(...args:any[]):string{
      console.log("arguments",args[0]);
      if(args === undefined) return;
      let out:string="";
      for (let i=0; i< args.length-1; i++){
          out+= args[i].toString() + " ";
      }
      return out + args[args.length-1];
  }

  getDateTime(seconds:number):string{
      return (new Date((seconds*1000))).toString();
  }

  sortData(sort: Sort) {
    const data = this.txs.slice();
    if (!sort.active || sort.direction == '') {
      this.txs = data;
      return;
    }

    this.txs = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case this.COLUMNS[0]: return compare(a.toaddr, b.toaddr, isAsc);
        case this.COLUMNS[1]: return compare(+a.fromaddr, +b.fromaddr, isAsc);
        case this.COLUMNS[2]: return compare(+a.amount, +b.amount, isAsc);
        case this.COLUMNS[3]: return compare(+a.datetime, +b.datetime, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}