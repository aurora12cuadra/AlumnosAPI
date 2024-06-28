
# Usar una imagen base de Java
FROM openjdk:17-jdk-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR al contenedor
COPY target/Alumnos-0.0.1-SNAPSHOT.jar /app/AlumnosAPI.jar

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 8083

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "AlumnosAPI.jar"]
