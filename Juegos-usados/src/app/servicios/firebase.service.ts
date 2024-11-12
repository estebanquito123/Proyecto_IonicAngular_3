import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../models/bd.models';
import { getAuth, updateProfile, createUserWithEmailAndPassword  } from 'firebase/auth';

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
}







