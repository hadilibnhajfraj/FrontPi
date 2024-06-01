import { Component, OnInit } from '@angular/core';
import { ChequeService } from '../service/cheque.service'; // Assurez-vous de l'importer correctement
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCheques: number;
  chequesDue: number;
  percentageDue: number;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  public pieChartLabels: Label[] = ['Total Cheques', 'Cheques Echu'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartColors: any[] = [
    {
      backgroundColor: ['green', 'red']
    }
  ];

  constructor(private chequeService: ChequeService) {}

  ngOnInit() {
    this.loadChequeData(); // Charger les données des chèques échus au chargement du composant
  }

  loadChequeData() {
    this.chequeService.checkChequeEcheance().subscribe(
      (data: any) => {
        this.totalCheques = data.totalCheques;
        this.chequesDue = data.chequesDue;
        this.percentageDue = data.percentageDue;
        this.updateChart(); // Mettre à jour le graphique avec les nouvelles données
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération des données des chèques échus : ', error);
      }
    );
  }

  updateChart() {
    this.pieChartData = [this.totalCheques, this.chequesDue];
  }
}
