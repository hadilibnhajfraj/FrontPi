import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private apiUrl = "http://localhost:3000/cours/chat";

  constructor(private http: HttpClient) {}

  postQuestion(question: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post<any>(this.apiUrl, { question }, { headers });
  }
}
