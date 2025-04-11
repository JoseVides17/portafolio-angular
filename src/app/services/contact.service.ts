import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import emailjs from '@emailjs/browser';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly PUBLIC_KEY = 'ZLnfqPHKqwjx-cfY0'; // Reemplaza con tu Public Key de EmailJS
  private readonly SERVICE_ID = 'service_phqygrj'; // Reemplaza con tu Service ID de EmailJS
  private readonly TEMPLATE_ID = 'template_8ok2toi'; // Reemplaza con tu Template ID de EmailJS

  constructor() {
    emailjs.init(this.PUBLIC_KEY);
  }

  sendMessage(formData: ContactForm): Observable<any> {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Jose Vides', // Reemplaza con tu nombre
    };

    return from(emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      templateParams
    )).pipe(
      map(response => ({
        success: true,
        message: '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.'
      }))
    );
  }
} 