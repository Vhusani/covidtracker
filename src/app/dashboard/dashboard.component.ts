/*
Author: Vhusani LIbago
github: github.com/vhusani
Occupation: Software Engineer
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../service/data.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { WorldwideComponent } from '../worldwide/worldwide/worldwide.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalCases: any;
  totalDeaths: any;
  totalRecoveries: any;

  todayRecovered: any;
  todayCases: any;
  todayDeaths: any;

  data!: any[];
  displayedColumns =  ['country', 'countryInfo','cases', 'recovered', 'deaths' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private service: DataService, public modalService: NgbModal) { }

  worldwide(){
    let sumCases = this.data.map( o => o.cases).reduce((a, c) => {
      return a + c
    });

    let sumDeaths = this.data.map(o => o.deaths).reduce((a, c) => {
      return a + c
    });

    let sumRecoveries = this.data.map(o => o.recovered).reduce((a, c)=>{
      return a + c
    })

    this.totalCases = sumCases.toLocaleString();
    this.totalDeaths = sumDeaths.toLocaleString();
    this.totalRecoveries = sumRecoveries.toLocaleString();

  }

  todayWorldwide(){
    let sumtodayCases = this.data.map(o => o.todayCases).reduce((a, c) => {
      return a + c
    });

    let sumtodayDeaths = this.data.map(o => o.todayDeaths).reduce((a, c) =>{
      return a + c
    });

    let sumtodayRecovered = this.data.map(o => o.todayRecovered).reduce((a, c) =>{
      return a + c
    });

    this.todayCases = sumtodayCases.toLocaleString();
    this.todayDeaths = sumtodayDeaths.toLocaleString();
    this.todayRecovered = sumtodayRecovered.toLocaleString();
  }

  ngOnInit() : void{
      this.service.getData().subscribe((response:any) =>{
        this.dataSource = new MatTableDataSource(response); 
        this.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
       // console.log(response);
       console.log(this.data);
        this.worldwide();
        this.todayWorldwide();
      });

  }

  world(){
      let ngbModalOptions: NgbModalOptions = {
       // backdrop: 'static',
        keyboard: false,
        centered: true,
        size: 'lg'
      };
      console.log(ngbModalOptions);
      const modalRef = this.modalService.open(WorldwideComponent, ngbModalOptions);
      modalRef.componentInstance.ModalTtitle = "Edit Client";
      modalRef.componentInstance.totalCases = this.totalCases;
      modalRef.componentInstance.totalRecoveries = this.totalRecoveries;
      modalRef.componentInstance.totalDeaths = this.totalDeaths;
      //today
      modalRef.componentInstance.todayCases = this.todayCases;
      modalRef.componentInstance.todayDeaths = this.todayDeaths;
      modalRef.componentInstance.todayRecovered = this.todayRecovered;
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

}
