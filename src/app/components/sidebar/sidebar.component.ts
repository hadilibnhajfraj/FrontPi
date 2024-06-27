
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/AuthService";
import { NotificationsService } from "../../services/notifications.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  showNotification?:boolean
  selected?: boolean; // Définir la propriété selected comme optionnelle
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/cours",
    title: "Gestion des cours",
    showNotification: true,
    icon: "education_atom",
    class: "",
    children: [
      {
        path: "/observation",
        title: "Observations",
        icon: "education_paper",
        class: "",
      },
      {
        path: "/etudiant",
        title: "Gestion des élèves",
        icon: "users_circle-08",
        class: "",
      },
      {
        path: "/matiere",
        title: "Gestion des matières",
        icon: "education_agenda-bookmark",
        class: "",
      },
    ],
  },
  { path: "/listUser", title: "Liste User", icon: "design_app", class: "" },
  { path: "/icons", title: "Icons", icon: "education_atom", class: "" },
  { path: "/maps", title: "Maps", icon: "location_map-big", class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "ui-1_bell-53",
    class: "",
  },
  {
    path: "/user-profile",
    title: "User Profile",
    icon: "",
    class: ""
  }

,  { path: "/afficheRepas", title: "Repas", icon: "design_app", class: "" },
  { path: "/bus", title: "Bus", icon: "education_atom", class: "" },
  {
    path: "/chauffeur",
    title: "Chauffeurs",
    icon: "users_single-02",
    class: "",
  },
  {
    path: "/activite",
    title: "ACTIVITES",
    icon: "location_map-big",
    class: "",
  },
  { path: "/repasAffichage", title: "Repas", icon: "design_app", class: "" },
  { path: "/busaffichage", title: "Bus", icon: "education_atom", class: "" },
  {
    path: "/fetchActivite",
    title: "Activites",
    icon: "location_map-big",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  selectedMenuItem: any;
  selectedChildItem: any;
  notificationsList: any[];
  constructor(private notificationsService: NotificationsService, public authService: AuthService, private router: Router) {
    this.notificationsService.currentNotificationsList.subscribe(data => this.notificationsList = data)
  }

  readAllNotifications() {
    this.notificationsService.updateNotifications([])
  }


  getMenuItemsBasedOnRole(): RouteInfo[] {
    const role = this.authService.getUserRole();
    let filteredMenuItems: RouteInfo[] = [];

    if (role === "admin") {
      filteredMenuItems = ROUTES.filter(
        (item) =>
          item.path !== "/repasAffichage" &&
          item.path !== "/busaffichage" &&
          item.path !== "/fetchActivite" &&
          item.path !== "/icons" &&
          item.path !== "/maps" &&
          item.path !== "/notifications"&&
          item.path !== "/user-profile"
        // Exclude 'listUser' from menu for enseignant and parent
      );
    } else if (role === "parent"||role === 'enseignant') {
      // Show specific menu items for enseignant and parent
      filteredMenuItems = ROUTES.filter(
        (item) =>
          item.path !== "/afficheRepas" &&
          item.path !== "/bus" &&
          item.path !== "/chauffeur" &&
          item.path !== "/activite" &&
           item.path !== '/listUser' &&
           item.path !== "/icons" &&
           item.path !== "/maps" &&
           item.path !== "/notifications"&&
           item.path !== "/user-profile"

      );
    } else {
      // Default case (handle other roles or unexpected scenarios)
      filteredMenuItems = [];
    }

    return filteredMenuItems;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }

  ngOnInit() {
    this.menuItems = this.getMenuItemsBasedOnRole();
    this.menuItems = this.menuItems.map((item) => {
      return {
        ...item,
        showChildren: false,
        selected: false,
      };
    });
  }

  toggleSubMenu(menuItem: any): void {
    this.selectedMenuItem = menuItem;
    if (menuItem.children && menuItem.children.length > 0) {
      menuItem.showChildren = true;
    }
  }

  toggleChildItem(childItem: any): void {
    this.selectedChildItem = childItem;
    this.menuItems.forEach((menuItem) => {
      if (menuItem.children && menuItem.children.length > 0) {
        menuItem.children.forEach((child) => {
          child.selected = child === childItem;
        });
      }
    });
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
