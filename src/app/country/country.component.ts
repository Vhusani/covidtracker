import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Chart, registerables } from 'chart.js'


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  data: any;
  //chart
  active: any;
  recovered: any;
  deaths: any;
  tests: any;
  //new
  todayCases:any;
  //chart per one million
  activePerOneMillion: any;
  recoveredPerOneMillion: any;
  deathsPerOneMillion: any;
  testsPerOneMillion: any;
  //chart
  chart: any;

  constructor(private route: ActivatedRoute, private service: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    let country = this.route.snapshot.params['country'];
    this.service.getCountry(country).subscribe(response => {
      console.log(response);
      this.data = response;

      //data combined
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: ['Active Cases', 'Recovered', 'Deaths', 'Tests'],
          datasets: [{
            label: "Covid 19 stats per one million",
            data: [this.data.activePerOneMillion, this.data.recoveredPerOneMillion, this.data.deathsPerOneMillion, this.data.testsPerOneMillion],
            //fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderWidth: 0,
            borderColor: 'blue'
          }],
        }
      });
      //todays stats
      this.chart = new Chart('today', {
        type: 'bar',
        data: {
          labels: ['Today Cases', 'Today Deaths', 'Today Tests'],
          datasets: [{
            label: "Covid 19 todays stats",
            data: [this.data.todayCases, this.data.todayDeaths, this.data.todayRecovered],
            //fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)'
            ],
            borderWidth: 0,
            borderColor: 'blue'
          }],
        }
      });

    });


  }
}




