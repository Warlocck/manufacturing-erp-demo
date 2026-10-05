Manufacturing ERP Demo

Sistema web de demostración para la gestión de inventario y piezas de producción.

El proyecto presenta una arquitectura separada entre frontend, backend y base de datos, con una API REST desarrollada en Spring Boot, una interfaz web desarrollada con React y TypeScript, y PostgreSQL como sistema de gestión de base de datos.

Nota: Este repositorio utiliza datos, nombres y configuraciones ficticias creados exclusivamente para fines demostrativos y de portafolio.

Tecnologías
Backend
Java 17+
Spring Boot 3.2
Spring Data JPA
PostgreSQL
REST API
OpenAPI / Swagger
Maven
Frontend
React
TypeScript
Vite
Context API
Componentes reutilizables
pnpm
Base de datos
PostgreSQL
Esquema manufacturing
Vistas
Procedimientos almacenados
Restricciones e índices
Datos de demostración
Arquitectura
┌──────────────────────────────┐
│          Frontend            │
│      React + TypeScript      │
│            Vite              │
└──────────────┬───────────────┘
               │
               │ HTTP / REST
               ▼
┌──────────────────────────────┐
│           Backend            │
│        Spring Boot           │
│                              │
│ Controllers                  │
│ Services                     │
│ Repositories                 │
│ DTOs                         │
│ Exception Handling           │
└──────────────┬───────────────┘
               │
               │ JPA / SQL
               ▼
┌──────────────────────────────┐
│         PostgreSQL           │
│                              │
│ manufacturing schema         │
│ Tables                       │
│ Views                        │
│ Stored Procedures            │
└──────────────────────────────┘
Funcionalidades
Gestión de clientes
Listado de clientes.
Consulta mediante API REST.
Información básica de clasificación y ubicación.
Datos ficticios para demostración.
Gestión de inventario
Visualización de piezas.
Filtrado por estado.
Filtrado por cliente.
Búsqueda por código o nombre.
Información de material y peso.
Fecha de registro.
Consulta mediante API REST.
Reportes
Exportación del inventario a PDF.
Aplicación de filtros antes de generar el reporte.
Backend
Arquitectura por capas.
DTOs para transferencia de información.
Repositories mediante Spring Data JPA.
Manejo global de excepciones.
Configuración CORS.
Documentación de API mediante OpenAPI / Swagger.
Base de datos

El script incluido crea un entorno de demostración independiente:

database/
└── database_demo.sql

El script contiene:

Tablas de clientes.
Tablas de piezas.
Estados de proceso.
Información de planos.
Vista de inventario.
Procedimientos almacenados.
Restricciones de integridad.
Datos ficticios.
Estructura del proyecto
manufacturing-erp-demo/
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── manufacturing/
│           │           └── erp/
│           └── resources/
│               └── application.properties
│
├── frontend/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── client/
│       ├── src/
│       └── index.html
│
├── database/
│   └── database_demo.sql
│
└── README.md
Requisitos

Para ejecutar el proyecto localmente se recomienda tener instalado:

JDK 17 o superior
Maven 3.9+
Node.js
pnpm
PostgreSQL
Configuración de la base de datos

Crear una base de datos PostgreSQL:

CREATE DATABASE manufacturing_erp;

Después ejecutar:

database/database_demo.sql

El script crea el esquema:

manufacturing

y los objetos necesarios para la demostración.

Configuración del backend

El backend permite configurar la conexión mediante variables de entorno:

DB_URL
DB_USERNAME
DB_PASSWORD

Ejemplo:

$env:DB_URL="jdbc:postgresql://localhost:5432/manufacturing_erp?currentSchema=manufacturing"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="tu_password"

También puede utilizarse la configuración local definida en application.properties.

Ejecutar backend

Desde backend/:

mvn spring-boot:run

El servidor se ejecuta por defecto en:

http://localhost:8080
Documentación de API

Una vez iniciado el backend:

http://localhost:8080/swagger-ui.html

La especificación OpenAPI está disponible en:

http://localhost:8080/api-docs
Configuración del frontend

Desde frontend/ instalar las dependencias:

pnpm install

El frontend utiliza las siguientes variables de entorno:

VITE_API_BASE_URL
VITE_USE_MOCK_DATA

Ejemplo:

VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCK_DATA=true

El modo mock permite ejecutar la interfaz sin necesidad de conectar el backend.

Ejecutar frontend

Desde:

frontend/

ejecutar:

pnpm dev

Vite mostrará la dirección local disponible para acceder a la aplicación.

Modo de demostración

El frontend incluye datos ficticios para facilitar la ejecución y demostración de la interfaz.

Para utilizar los datos mock:

VITE_USE_MOCK_DATA=true

Para consumir el backend:

VITE_USE_MOCK_DATA=false

y configurar:

VITE_API_BASE_URL=http://localhost:8080/api
Consideraciones de seguridad

Este repositorio está preparado como una demostración pública.

No se incluyen:

Credenciales reales.
Claves API.
Contraseñas de producción.
Datos reales de clientes.
Información empresarial confidencial.
Archivos de configuración privados.
Artefactos generados.

Todos los datos utilizados en la demostración son ficticios.

Objetivo del proyecto

El objetivo de este proyecto es demostrar la implementación de una aplicación empresarial full-stack utilizando una arquitectura separada por capas, una API REST, persistencia con PostgreSQL y una interfaz web moderna.

El proyecto sirve como ejemplo de integración entre frontend, backend y base de datos para un escenario de gestión de inventarios y producción.