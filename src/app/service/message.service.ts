// message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket: Socket;
  private readonly apiUrl = 'http://localhost:3000/message';
  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl, {
      withCredentials: true
    });

    this.socket.on('connect', () => {
      console.log('Connecté au serveur socket');
    });

    this.socket.on('disconnect', () => {
      console.log('Déconnecté du serveur socket');
    });
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/showall`);
  }

  addMessage(message: any): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/add`, message);
  }

  updateMessage(id: string, message: any): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/update/${id}`, message);
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  getConversation(id1: string, id2: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversation/${id1}/${id2}`);
  }

  getActiveUsersAndStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

  blockUser(blockerId: string, blockedId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/block/${blockerId}/${blockedId}`, {});
  }
  getNotifications(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notifications/${userId}`);
  }
  generateNotification(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notification/${userId}`);
  }

  getMessageById(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/get/${id}`);
  }

  sendMessage(msg: string): void {
    this.socket.emit('msgs', msg);
  }

  fetchConversation(id1: string, id2: string): void {
    this.socket.emit('fetchConversation', { id1, id2 });
  }

  onMessage(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('msgs', (data: string) => {
        observer.next(data);
      });
    });
  }
  getNumberOfMessagesReceived(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count/${userId}`);
  }
  onConversationData(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('conversationData', (data: any) => {
        observer.next(data);
      });
    });
  }
}
