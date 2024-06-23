import { Component, OnInit } from "@angular/core";

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
  { path: "/activite", title: "ACTIVITES", icon: "location_map-big", class: "" },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
