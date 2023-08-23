import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-light-store-house',
  templateUrl: './light-store-house.page.html',
  styleUrls: ['./light-store-house.page.scss'],
})
export class LightStoreHousePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goLightStoreOperator(operator){
    operator="light-store-house/"+operator;
    this.router.navigate([operator]);
  }
}
