//utils.service.ts
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addDoc, collection, getFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {getStorage, uploadString, ref, getDownloadURL} from "firebase/storage";
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl= inject(ToastController);
  modalCtrl = inject(ModalController);
  router= inject(Router);

async takePicture (promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Seleccionar una foto',
    promptLabelPicture: 'Tomar una foto'
  });
};

  loading() {
    return this.loadingCtrl.create({spinner: 'crescent'})
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts)

    await modal.present();

    const {data} =await modal.onWillDismiss()

    if(data) return data;
  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data)
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }


}
