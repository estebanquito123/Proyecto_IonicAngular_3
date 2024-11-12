import { Component, OnInit,Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/bd.models';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {
  @Input() IsModal: boolean;
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  form = new FormGroup({
    uid: new FormControl(''),
    imagen: new FormControl('', [Validators.required,]),
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required, Validators.min(0)])
  });
  firebaseSvc= inject(FirebaseService);
  utilsSvc= inject(UtilsService);
  constructor() { }

  dismissModal() {
    this.utilsSvc.dismissModal()
  }

  ngOnInit() {}
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.signUp(this.form.value as Usuario).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.nombre);
        let uid= res.user.uid;


      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'

        });

      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}
