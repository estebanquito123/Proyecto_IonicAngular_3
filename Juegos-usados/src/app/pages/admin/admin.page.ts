import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/add-update-product/add-update-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  firebaseSvc= inject(FirebaseService);
  utilsSvc= inject(UtilsService)

  constructor() { }

  ngOnInit() {
  }

  addUpdateProduct() {
    this.utilsSvc.presentModal ({
      component: AddUpdateProductComponent
    })
  }

}
