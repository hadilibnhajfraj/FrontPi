import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-fetch-notification',
  templateUrl: './fetch-notification.component.html',
  styleUrls: ['./fetch-notification.component.css']
})
export class FetchNotificationComponent implements OnInit {
  notifications: any[] = [];
  emailParent: string;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.emailParent = params['email'];
      this.fetchNotifications();
    });
  }

  fetchNotifications(): void {
    this.notificationService
      .getNotifications(this.emailParent)
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }
}
