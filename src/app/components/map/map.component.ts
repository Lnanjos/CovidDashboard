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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  summary: Summary

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.coronaService.sumBS.subscribe(data => this.summary = data);

    const map = new Map({
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


    const circle: Circle = new Circle(fromLonLat([4.35247, 50.84673]), 1000000);
    const circle2: Circle = new Circle([4.35247, 50.84673], 100000);

    const feature = new Feature(circle);
    const feature2 = new Feature(circle2);

    let vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [feature, feature2]
      }),
      visible: true,
      style: new Style({
        fill: new Fill({ color: [255, 99, 71, 0.8] }),
        stroke: new Stroke({ color: [255, 99, 71, 1], width: 1.5 })
      })
    });

    map.addLayer(vectorLayer);
  }

}
