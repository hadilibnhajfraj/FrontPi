
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
    icon: "users_single-02",
    class: "",
  },
  {
    path: "/table-list",
    title: "Table List",
    icon: "design_bullet-list-67",
    class: "",
  },
  {
    path: "/typography",
    title: "Typography",
    icon: "text_caps-small",
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

    // Example logic to filter menu items based on role
    if (role === 'admin') {
      // Show all menu items
      filteredMenuItems = ROUTES;
    } else if (role === 'enseignant' || role === 'parent') {
      // Show specific menu items for enseignant and parent
      filteredMenuItems = ROUTES.filter(item =>
        item.path !== '/listUser' // Exclude 'listUser' from menu for enseignant and parent
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
