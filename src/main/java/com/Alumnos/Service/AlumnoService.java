
package com.Alumnos.Service;

import com.Alumnos.Entidades.Alumno;
import java.util.List;
import java.util.Optional;

public interface AlumnoService {
    List<Alumno> findAll();
    Optional<Alumno> findById(Long id);
    Alumno save(Alumno alumno);
    void deleteById(Long id);
}
