//add-update-product-ts
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

  usuario= {} as Usuario;

  ngOnInit() {
    this.usuario= this.utilsSvc.getFromLocalStorage('usuario');
  }


async takePicture() {
  const dataUrl = (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
  this.form.controls.imagen.setValue(dataUrl)
}
async submit() {
  // Verificar si this.usuario y this.usuario.uid están definidos
  if (!this.usuario || !this.usuario.uid) {
    this.utilsSvc.presentToast({
      message: 'No se pudo obtener la información del usuario. Por favor, inicie sesión de nuevo.',
      duration: 2000,
      color: 'danger',
      position: 'middle',
      icon: 'alert-circle-outline'
    });
    return; // Detener la ejecución si el usuario no está definido
  }

  if (this.form.valid) {
    const path = `usuarios/${this.usuario.uid}/productos`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
      this.utilsSvc.dismissModal({ success: true });
      this.utilsSvc.presentToast({
        message: 'Producto creado exitosamente',
        duration: 2000,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      });
    }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2000,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }).finally(() => {
      loading.dismiss();
    });
  }
}

}
