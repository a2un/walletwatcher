import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule,Http } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule,MatInputModule,MatIconModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { AppComponent } from './app.component';
import { AppservicesService } from './services/appservices.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,FormsModule,MatFormFieldModule,MatInputModule,MatIconModule,HttpModule,
    MatSortModule
  ],
  providers: [AppservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
