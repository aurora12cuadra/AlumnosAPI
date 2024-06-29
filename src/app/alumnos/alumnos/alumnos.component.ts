import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../service/alumno.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [TableModule, CommonModule, HttpClientModule, DialogModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo: string = 'Lista de alumnos';
  losAlumnos: Alumno[] = [];
  displayUpdateModal: boolean = false;
  selectedAlumno: Alumno = new Alumno();

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    console.log('AlumnosComponent initialized');
    this.getAlumnos();
  }

  getAlumnos(): void {
    console.log('Fetching alumnos...');
    this.alumnoService.getAlumnos().subscribe(
      (alumnos) => {
        console.log('Alumnos fetched successfully', alumnos);
        this.losAlumnos = alumnos;
      },
      (error) => {
        console.error('Error fetching alumnos', error);
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un problema al obtener la lista de alumnos',
          icon: 'error'
        });
      }
    );
  }

  openUpdateModal(alumno: Alumno): void {
    this.selectedAlumno = { ...alumno }; // Clonar el objeto para evitar modificar el original directamente
    this.displayUpdateModal = true;
  }

  cancelUpdate(): void {
    this.displayUpdateModal = false;
    this.selectedAlumno = new Alumno(); // Resetear el alumno seleccionado
  }

  confirmUpdate(): void {
    this.alumnoService.updateAlumno(this.selectedAlumno).subscribe(
      (updatedAlumno) => {
        console.log('Alumno updated successfully', updatedAlumno);
        Swal.fire('Success', 'Alumno actualizado exitosamente', 'success');
        this.getAlumnos(); // Refrescar la lista de alumnos
        this.displayUpdateModal = false;
      },
      (error) => {
        console.error('Error updating alumno', error);
        Swal.fire('Error', 'Hubo un problema al actualizar el alumno', 'error');
      }
    );
  }

  Eliminar(id: number): void {
    console.log('Deleting alumno with id', id);
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras cambiarlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.deleteAlumno(id).subscribe(
          () => {
            console.log('Alumno deleted successfully');
            Swal.fire({
              title: "Eliminar!",
              text: "El registro se eliminó satisfactoriamente.",
              icon: "success"
            });
            this.getAlumnos();
          },
          (error) => {
            console.error('Error deleting alumno', error);
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un problema al eliminar el alumno',
              icon: 'error'
            });
          }
        );
      }
    });
  }
}
