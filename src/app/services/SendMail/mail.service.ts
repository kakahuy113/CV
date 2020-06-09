import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MailService {
  url: string = "http://localhost:3000/send"
  constructor(private http: HttpClient) { }
  sendMail(content: any) {
    return this.http.post(this.url,
      JSON.stringify(content),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' })
    }
}
