import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  mainSkills = [
    { name: 'Angular', percentage: 90 },
    { name: 'Spring', percentage: 85 },
    { name: 'Laravel', percentage: 80 },
    { name: 'React', percentage: 75 },
    { name: 'Java', percentage: 85 },
    { name: 'PHP', percentage: 80 }
  ];
}
