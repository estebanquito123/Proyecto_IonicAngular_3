import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../models/bd.models';
import { getAuth, updateProfile, createUserWithEmailAndPassword  } from 'firebase/auth';
import { addDoc, collection, getFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {getStorage, uploadString, ref, getDownloadURL} from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(AngularFireAuth);

  sendRecoveryEmail(email: string) {
    return this.auth.sendPasswordResetEmail(email); // Utiliza la instancia de AngularFireAuth
  }

  signUp(user: Usuario) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, {displayName})
  }
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

}







