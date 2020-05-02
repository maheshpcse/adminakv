import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMessage(data: any) {
    console.log(data);
    return this.http.post(ApiService.API.SEND_NEW_MESSAGE, data);
  }

  receiveMessages() {
    return this.http.get(ApiService.API.REVEIVE_MESSAGES);
  }
}
