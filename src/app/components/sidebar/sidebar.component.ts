import { Component, OnInit } from "@angular/core";
import { ReclamationsService } from '../../service/reclamations.service';
import { Reclamation } from "../../../app/model/reclamation";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  notificationCount?: number;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "design_app", class: "", notificationCount: 0 },
  { path: "/icons", title: "Icons", icon: "education_atom", class: "" },
  { path: "/maps", title: "Maps", icon: "location_map-big", class: "" },
  { path: "/notifications", title: "Notifications", icon: "ui-1_bell-53", class: "" },
  { path: "/user-profile", title: "User Profile", icon: "users_single-02", class: "" },
  { path: "/table-list", title: "Table List", icon: "design_bullet-list-67", class: "" },
  { path: "/typography", title: "Typography", icon: "text_caps-small", class: "" },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  private intervalId: any;

  constructor(private reclamationService: ReclamationsService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.updateNotificationCount();
    this.intervalId = setInterval(() => {
      this.updateNotificationCount();
    }, 10000); // 10000 milliseconds = 10 seconds
  }

  updateNotificationCount() {
    this.reclamationService.getNotification().subscribe((count: number) => {
      console.log("Notification count:", count); // Log the count value

      const dashboardItem = this.menuItems.find(item => item.path === '/dashboard');
      if (dashboardItem) {
        console.log("Dashboard item found:", dashboardItem);
        dashboardItem.notificationCount = count;
        console.log("Updated dashboard notificationCount:", dashboardItem.notificationCount);
      } else {
        console.error("Dashboard item not found in menuItems");
      }
    });
  }
}
