# 📋 Proyecto Final DAW - Sistema de Metas y Tareas (To Do List)

Aplicación web Full-Stack desarrollada para llevar el control de Metas y Tareas personales. El objetivo de este sistema es proporcionar un espacio donde los usuarios puedan registrar sus objetivos, desglosarlos en tareas accionables y establecer fechas límite para su cumplimiento.

## 🚀 Tecnologías Utilizadas

Este proyecto utiliza el stack **MERN** (MongoDB, Express, React, Node.js) junto con las siguientes herramientas:

**Frontend:**
* **React** (Vite)
* **Redux Toolkit** (Gestión de estado global)
* **React-Bootstrap & Sass** (Diseño y estilos responsivos)
* **Axios** (Peticiones HTTP)

**Backend:**
* **Node.js & Express** (Servidor web y endpoints)
* **MongoDB & Mongoose** (Base de datos NoSQL)
* **Autenticación:** Seguridad en los endpoints mediante **API Key** enviada por headers.

## ✨ Funcionalidades Principales

* **Gestión de Metas:** Creación y eliminación de metas con fecha límite.
* **Gestión de Tareas:** Creación de tareas vinculadas a una meta específica y eliminación de las mismas.
* **Sincronización:** Estado global gestionado de forma centralizada con Redux para una actualización inmediata de la interfaz.
* **Seguridad:** Rutas del backend protegidas, requiriendo una API Key válida para procesar cualquier solicitud GET, POST o DELETE.

## ⚙️ Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, necesitas tener [Node.js](https://nodejs.org/) y una cuenta/cluster en [MongoDB](https://www.mongodb.com/).

### 1. Clonar el repositorio
```bash
git clone [https://github.com/N1WDE/proyecto-final-DAW.git](https://github.com/N1WDE/proyecto-final-DAW.git)
cd proyecto-final-DAW
