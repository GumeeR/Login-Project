<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# 📚 Sistema de Login
Este proyecto es un **Sistema de Login** desarrollado con **Laravel**, que permite a los usuarios iniciar sesión y acceder a un dashboard protegido.

## 🚀 Características

- **Interfaz Atractiva**: Diseño minimalista y responsivo para una mejor experiencia de usuario. 🎨
- **Validación de Formulario**: Asegura que los datos ingresados sean correctos antes de enviarlos. ✅
  - Validación de correo electrónico
  - Contraseña mínima de 6 caracteres
  - Mensajes de error específicos para cada campo
- **Manejo de Sesiones**: Utiliza `localStorage` para mantener la sesión activa del usuario. 🔒
- **Mensajes de Error**: Proporciona retroalimentación clara en caso de errores durante el inicio de sesión. ⚠️
- **Efecto de Loading**: Muestra un spinner durante el proceso de autenticación. ⏳
- **Cierre de Sesión**: Permite a los usuarios cerrar sesión de manera sencilla. 🚪
- **Redirección Inteligente**: Detecta sesiones existentes para redirigir automáticamente. 🔄

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - PHP: Estructura del contenido
  - CSS3: Estilos y diseño responsivo con variables para consistencia visual
  - JavaScript: Manipulación del DOM y manejo de eventos
  - AJAX: Comunicación asíncrona con el servidor

- **Backend**:
  - Laravel: Framework PHP para manejar la autenticación y las rutas
  - Sistema de autenticación nativo de Laravel
  - CSRF protection
  - Manejo de rutas y controladores

- **Base de Datos**:
  - MySQL: Sistema de gestión de bases de datos para almacenar información de usuarios
