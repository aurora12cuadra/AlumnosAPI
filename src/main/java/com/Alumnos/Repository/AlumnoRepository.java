package com.Alumnos.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.Alumnos.Entidades.Alumno;


public interface AlumnoRepository extends JpaRepository <Alumno, Long> {
    
}
