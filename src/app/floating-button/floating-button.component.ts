import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface User {
  id: string;
  name: string;
  role: string[];
  notificationCount?: number;
  notifications?: any[];
}

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit, OnDestroy {
  activeUsers: User[] = [];
  showList: boolean = false;
  selectedUsers: User[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private messageService: MessageService, private eRef: ElementRef) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (!this.eRef.nativeElement.contains(targetElement)) {
      this.showList = false;
    }
  }

  toggleActiveUsers(): void {
    if (this.showList) {
      this.showList = false;
    } else {
      const sub = this.messageService.getActiveUsersAndStudents().subscribe(
        (users: User[]) => {
          this.activeUsers = users;
          this.showList = true;
        },
        (error) => {
          console.error('Error fetching active users:', error);
        }
      );
      this.subscriptions.push(sub);
    }
  }

  handleUserClick(user: User): void {
    if (!this.selectedUsers.some(u => u.id === user.id)) {
      this.selectedUsers.push(user);
      const sub = this.getNumberOfMessagesReceived(user.id).subscribe(
        (count) => {
          user.notificationCount = count;
          this.fetchNotifications(user);
        },
        (error) => {
          console.error(`Error fetching number of messages for user ${user.id}:`, error);
          user.notificationCount = 0; // Error handling
        }
      );
      this.subscriptions.push(sub);
    }
    this.showList = false;
  }

  fetchNotifications(user: User): void {
    const sub = this.messageService.getNotifications(user.id).subscribe(
      (data) => {
        user.notifications = data.messages.map((notification) => ({
          message: notification.message,
          image: notification.image,
          fichier: notification.fichier,
          sender: notification.sender,
          timestamp: notification.timestamp,
        }));
        console.log("Notifications for user:", user.id, user.notifications);
      },
      (error) => {
        console.error(`Error fetching notifications for user ${user.id}:`, error);
        user.notifications = [];
      }
    );
    this.subscriptions.push(sub);
  }


  removeChat(userId: string): void {
    this.selectedUsers = this.selectedUsers.filter(user => user.id !== userId);
  }

  getNumberOfMessagesReceived(userId: string): Observable<number> {
    return this.messageService.getNumberOfMessagesReceived(userId).pipe(
      map(data => data.count),
      catchError(error => {
        console.error(`Error fetching number of messages for user ${userId}:`, error);
        return of(0); // Error handling
      })
    );
  }
}
