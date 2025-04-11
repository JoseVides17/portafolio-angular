import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type CertificateId = 'sena' | 'unab-tecnico' | 'unab-diplomado-moviles' | 'unab-diplomado-fundamentos' | 'unab-diplomado-basica' | 'unab-diplomado-desarrollo-software';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  certificateUrls: Record<CertificateId, string> = {
    'sena': 'assets/certificates/sena.pdf',
    'unab-tecnico': 'assets/certificates/unab-tecnico.pdf',
    'unab-diplomado-moviles': 'assets/certificates/unab-diplomado-moviles.pdf',
    'unab-diplomado-fundamentos': 'assets/certificates/unab-diplomado-fundamentos.pdf',
    'unab-diplomado-basica': 'assets/certificates/unab-diplomado-basica.pdf',
    'unab-diplomado-desarrollo-software': 'assets/certificates/unab-diplomado-desarrollo-software.pdf'
  };

  showCertificate(certificateId: CertificateId) {
    const url = this.certificateUrls[certificateId];
    if (url) {
      window.open(url, '_blank');
    }
  }
}
