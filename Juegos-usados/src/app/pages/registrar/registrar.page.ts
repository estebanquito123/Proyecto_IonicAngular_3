//registrar.page.ts
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss']
})
export class RegistrarPage implements OnInit {
  registroForm: FormGroup;

  private authService = inject(AuthService);
  private alertController = inject(AlertController);
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombreCompleto: ['', Validators.required],
      rol: ['cliente', Validators.required]
    });
  }

  async registrar() {
    if (this.registroForm.invalid) {
      return; // No intenta registrarse si el formulario es inválido
    }

    const { email, password, nombreCompleto, rol } = this.registroForm.value;

    try {
      const resultado = await this.authService.registrarNuevoUsuario(nombreCompleto, email, password, rol);
      if (resultado) {
        this.mostrarAlerta('Éxito', 'Usuario registrado exitosamente en Firebase Authentication y Firestore');
      }
    } catch (error) {
      this.mostrarAlerta('Error', error.message);
    }
  }


  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}



