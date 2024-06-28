package com.Alumnos;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite CORS para todas las rutas
                .allowedOrigins("*")  // Orígenes permitidos (puedes configurar específicamente como "http://localhost:4200" en desarrollo)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos HTTP permitidos
                .allowedHeaders("*");  // Encabezados permitidos
    }
}
