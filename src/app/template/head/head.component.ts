import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  appName="https://media.thesouthmart.com//2021/11/logo.png";
  routerName!: any;

  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  dashboard(){
       this.router.navigate(['']);
  }

}
