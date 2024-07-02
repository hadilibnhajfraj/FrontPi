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
    path: "/enplois",
    title: "Gestion des emplois",
    icon: "education_atom",
    class: "",
    children: [
     
     
    ],
  },
  {
    path: "/etudiant",
    title: "Gestion des étudiants",
    icon: "fas fa-user-graduate",  // Utilisez l'icône "school" de Material Icons
    class: "",
    children: [],
  },
  {
    path: "/classe",
    title: "Gestion des classes",
    icon: "fas fa-school",  // Utilisez l'icône "school" de Material Icons
    class: "",
    children: [],
  },
  {
    path: "/salle",
    title: "Gestion des salle",
    icon: "fa-solid fa-building",  // Utilisez l'icône "school" de Material Icons
    class: "",
    children: [],
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
  constructor() { }

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
