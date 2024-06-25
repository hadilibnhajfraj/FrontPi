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
  { path: "/afficheRepas", title: "Repas", icon: "design_app", class: "" },
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

    // Example logic to filter menu items based on role
    if (role === "admin") {
      filteredMenuItems = ROUTES.filter(
        (item) =>
          item.path !== "/repasAffichage" &&
          item.path !== "/busaffichage" &&
          item.path !== "/fetchActivite"
        // Exclude 'listUser' from menu for enseignant and parent
      );
    } else if (role === "parent") {
      // Show specific menu items for enseignant and parent
      filteredMenuItems = ROUTES.filter(
        (item) =>
          item.path !== "/afficheRepas" &&
          item.path !== "/bus" &&
          item.path !== "/chauffeur" &&
          item.path !== "/activite"
        // Exclude 'listUser' from menu for enseignant and parent
      );
    } else {
      // Default case (handle other roles or unexpected scenarios)
      filteredMenuItems = [];
    }

    return filteredMenuItems;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
