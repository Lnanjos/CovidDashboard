import { Component, OnInit } from '@angular/core';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Circle from 'ol/geom/Circle';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke';
import { Summary } from 'src/app/common/summary';
import { CoronaService } from 'src/app/services/corona.service';
import countries from 'src/app/components/map/convertcsv.json'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  summary: Summary;

  features: Feature[];

  map: Map;

  visibility: string = "visibilityMap";

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {

    this.coronaService.sumBS.subscribe(data => { this.summary = data; this.loadCountries() });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    });
  }

  loadCountries() {

    if (this.summary != undefined) {
      console.log('start');
      countries.forEach(element => {
        this.summary.Countries.forEach(country => {
          if ((country.CountryCode != undefined) && (country.CountryCode === element.country)) {
            country.Latitude = element.latitude;
            country.Longitude = element.longitude;
            if (country.TotalConfirmed > 0) {
              if (this.features == undefined) {
                this.features = [new Feature(
                  new Circle(fromLonLat([country.Longitude, country.Latitude]), country.TotalConfirmed)
                )]
              } else {
                this.features.push(new Feature(
                  new Circle(fromLonLat([country.Longitude, country.Latitude]), country.TotalConfirmed)
                ));
              }
              console.log(country.CountryCode + '-' + element.country);
            }
          }
        });
      });

      if (this.features != undefined) {
        let vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: this.features
          }),
          visible: true,
          style: new Style({
            fill: new Fill({ color: [255, 99, 71, 0.8] }),
            stroke: new Stroke({ color: [255, 99, 71, 1], width: 1.5 })
          })
        });
        this.map.addLayer(vectorLayer);
        this.visibility = '';
      }
    }
  }
}
