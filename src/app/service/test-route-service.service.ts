import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestRouteServiceService {
  test1="asd";
  imageMap = new Map();

  constructor(private router: Router, private route: ActivatedRoute) { 

    console.log("service生命周期开始");
  }
  test(){
    var a=document.getElementById('testbutton');
    console.log(a);
    this.imageMap.set("test","啊啊啊");
  }
}
