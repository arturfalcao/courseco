import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss']
})
export class DashboardpageComponent implements OnInit {

  dataSource$: any;
  desc: string = '';
  price: number = 0 ;
  value = 'Clear me';

  displayedColumns: string[] = ['description', 'price'];
  
  constructor(public dashboardService: DashboardService) {
    this.dataSource$ = this.dashboardService.productUpdate$;
  }

  addMore(): void {
    this.dashboardService.addProduct(this.desc, this.price);
  }

  ngOnInit(): void {
  }

}
