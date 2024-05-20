import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "design_app", class: "" },
  {
    path: "/cours",
    title: "Gestion des cours",
    icon: "education_atom",
    class: "",
    children: [
      {
        path: "/cours/lecon",
        title: "Leçon",
        icon: "education_agenda-bookmark",
        class: "",
      },
      {
        path: "/cours/observation",
        title: "Observation",
        icon: "education_paper",
        class: "",
      },
    ],
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];

  constructor() {}

  ngOnInit() {
    console.log("Menu items:", ROUTES);
    this.menuItems = ROUTES.map((item) => {
      return {
        ...item,
        showChildren: false,
      };
    });
    console.log("Menu items with showChildren property:", this.menuItems);
  }

  toggleSubMenu(menuItem: any): void {
    console.log("Toggling submenu:", menuItem);
    menuItem.showChildren = !menuItem.showChildren;

    if (menuItem.children) {
      console.log(
        "Children paths:",
        menuItem.children.map((child) => child.path)
      );
    }

    // Reste du code pour basculer la visibilité des enfants...
  }

  isMobileMenu() {
    console.log("Window width:", window.innerWidth);
    return window.innerWidth <= 991;
  }
}
