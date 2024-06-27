
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/AuthService";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

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

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.menuItems = this.getMenuItemsBasedOnRole();
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

  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
