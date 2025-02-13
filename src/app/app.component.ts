import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
import { AddressCountDTO } from './models/address-count-dto.model';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  chart: any = [];
  title = 'event_project';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getAddressCounts().subscribe((data: AddressCountDTO[]) => {
      // Extraire les labels, les événements payants et les événements gratuits
      const labels = data.map((event) => event.addressName);
      const eventPayantCounts = data.map((event) => event.eventPayantCount);
      const eventGratuitCounts = data.map((event) => event.eventGratuitCount);

      // Créer le graphique avec deux datasets (payant et gratuit)
      this.chart = new Chart('canvas', {
        type: 'line', // Changement du type de graphique en 'line'
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Événements payants',
              data: eventPayantCounts,
              borderWidth: 2,
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur pour les payants
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false, // Ne pas remplir sous la ligne
              tension: 0.1, // Lissage de la ligne
            },
            {
              label: 'Événements gratuits',
              data: eventGratuitCounts,
              borderWidth: 2,
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur pour les gratuits
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false, // Ne pas remplir sous la ligne
              tension: 0.1, // Lissage de la ligne
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
}
