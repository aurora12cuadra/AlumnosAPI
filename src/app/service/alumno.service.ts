import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../model/Alumno';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl =  `${environment.apiUrl}/alumnos`;

  
  constructor(private http: HttpClient) {}
 
  getAlumnos(): Observable<Alumno[]> {
    console.log('Calling API to get alumnos');
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  createAlumno(alumno: Alumno): Observable<Alumno> {
    console.log('Calling API to create alumno', alumno);
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno> {
    console.log('Calling API to update alumno', alumno);
    return this.http.put<Alumno>(`${this.apiUrl}/${alumno.id}`, alumno);
  }

  deleteAlumno(id: number): Observable<void> {
    console.log('Calling API to delete alumno with id', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
