import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService, ContactForm } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  formError = false;
  isSubmitting = false;
  submitMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.formError = false;
      
      const formData: ContactForm = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      };
      
      this.contactService.sendMessage(formData).subscribe({
        next: (response) => {
          console.log('Mensaje enviado con éxito:', response);
          this.formSubmitted = true;
          this.submitMessage = '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.';
          this.contactForm.reset();
          this.isSubmitting = false;
          
          // Ocultar el mensaje de éxito después de 5 segundos
          setTimeout(() => {
            this.formSubmitted = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error al enviar el mensaje:', error);
          this.formError = true;
          this.submitMessage = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.formError = true;
      this.submitMessage = 'Por favor, corrige los errores en el formulario.';
      
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Getters para facilitar la validación en el template
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
}
