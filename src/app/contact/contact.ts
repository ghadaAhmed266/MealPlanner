import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = L.map('map').setView([30.033333, 31.233334], 13); // القاهرة
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([30.033333, 31.233334]).addTo(map)
      .bindPopup('Hello Cairo!')
      .openPopup();
  }
}