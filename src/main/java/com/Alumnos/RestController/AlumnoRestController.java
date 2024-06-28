
package com.Alumnos.RestController;

import com.Alumnos.Entidades.Alumno;
import com.Alumnos.Service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alumnos")

public class AlumnoRestController {
     @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    public List<Alumno> getAllAlumnos() {
        return alumnoService.findAll(); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> getAlumnoById(@PathVariable Long id) {
        Optional<Alumno> alumno = alumnoService.findById(id);
        return alumno.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alumno createAlumno(@RequestBody Alumno alumno) {
        return alumnoService.save(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> updateAlumno(@PathVariable Long id, @RequestBody Alumno alumnoDetails) {
        Optional<Alumno> optionalAlumno = alumnoService.findById(id);
        if (optionalAlumno.isPresent()) {
            Alumno alumno = optionalAlumno.get();
            alumno.setNombre(alumnoDetails.getNombre());
            alumno.setPaterno(alumnoDetails.getPaterno());
            alumno.setMaterno(alumnoDetails.getMaterno());
            alumno.setEmail(alumnoDetails.getEmail());
            final Alumno updatedAlumno = alumnoService.save(alumno);
            return ResponseEntity.ok(updatedAlumno);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumno(@PathVariable Long id) {
        alumnoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
}
