import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  selected?: boolean; // Définir la propriété selected comme optionnelle
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
  constructor() {}

  ngOnInit() {
    console.log("Menu items:", ROUTES);
    this.menuItems = ROUTES.map((item) => {
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
