import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../service/alumno.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, InputNumberModule],
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent {
  alumno: Alumno = new Alumno();

  constructor(private alumnoService: AlumnoService) {}

  onSubmit(): void {
    console.log('Submitting form', this.alumno);
    this.alumnoService.createAlumno(this.alumno).subscribe(
      (response) => {
        console.log('Alumno created successfully', response);
        Swal.fire('Success', 'Alumno creado exitosamente', 'success');
        this.alumno = new Alumno(); // Reset the form
      },
      (error) => {
        console.error('Error creating alumno', error);
        Swal.fire('Error', 'Hubo un problema al crear el alumno', 'error');
      }
    );
  }
}
