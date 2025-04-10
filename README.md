
# Civa - Plataforma de Buses

**Civa** es una plataforma que permite gestionar la flota de buses, ofreciendo información detallada sobre cada uno de ellos, incluyendo características, estado y marca.

## Tecnologías utilizadas

- **Frontend**: React 18, TypeScript, Bootstrap
- **Backend**: Java 17, Spring Boot, MySQL
- **Otras**: Swagger para la documentación de la API

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/DiegoHLZ/civa-frontend.git
cd civa-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el proyecto en modo de desarrollo

```bash
npm start
```

Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## Características

- Visualización de buses con paginación.
- Modal para detalles de cada bus.
- Diseño responsive con Bootstrap.
- Autenticación básica implementada para las interacciones con la API.

## Endpoints

La API de **Civa** está documentada usando **Swagger**. Puedes acceder a ella desde [http://localhost:8080/swagger-ui](http://localhost:8080/swagger-ui) para explorar y probar los diferentes endpoints.

### Ejemplo de POST para crear un nuevo bus:

```json
{
  "numeroBus": "BUS-999",
  "placa": "ZWX-123",
  "caracteristicas": "Asientos reclinables, TV, aire acondicionado, USB",
  "activo": false,
  "marca": { "id": 6 }
}
```

### Paginación

Los buses se obtienen paginados, puedes cambiar el limite en 3, 5 o 10 buses por página. Puedes navegar entre las páginas de resultados.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, por favor sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea tu rama con los cambios (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 👤 Autor

- **DiegoHLZ**  
  Desarrollador de software  
  GitHub: [@DiegoHLZ](https://github.com/DiegoHLZ)
