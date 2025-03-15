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

## 📦 Estructura del proyecto

```
proyecto-login/
├── app/
│   └── Http/
│       └── Controllers/
│           └── AuthController.php
├── public/
│   ├── css/
│   │   └── login.css
│   ├── js/
│   │   ├── login.js
│   │   └── dashboard.js
│   └── images/
│       └── logo.png
├── resources/
│   └── views/
│       ├── login.blade.php
│       └── dashboard.blade.php
└── routes/
    └── web.php
```
## 🔧 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/GumeeR/Login-Project.git
```

2. Instala las dependencias:
```bash
composer install
npm install
```
3. Copia el archivo de entorno y configura las variables:
```bash
cp .env.example .env
# Edita las variables de base de datos en el archivo .env
```
4. Genera la clave de la aplicación:
```bash
php artisan key:generate
```
5. Ejecuta las migraciones:
```bash
php artisan migrate
```
6. Crea un usuario de prueba (opcional):
```bash
php artisan tinker
# Dentro de tinker:
User::create(['name' => 'Usuario Prueba', 'email' => 'usuario@ejemplo.com', 'password' => bcrypt('123456')]);
exit
```
7. Finalmente Inicia el servidor!:
```bash
php artisan serve
```
## 💻 Uso

1. Accede a `http://localhost:8000` en tu navegador
2. Utiliza las siguientes credenciales para probar:
   - Email: `usuario@ejemplo.com`
   - Contraseña: `123456`
3. Explora las funcionalidades de validación, persistencia y cierre de sesión

## 🧪 Pruebas

Para verificar el funcionamiento del sistema:

1. **Prueba de validación de campos**:
   - Intenta enviar el formulario vacío
   - Ingresa un email inválido
   - Ingresa una contraseña demasiado corta

2. **Prueba de persistencia**:
   - Inicia sesión correctamente
   - Cierra el navegador y vuelve a abrir la aplicación
   - Deberías ser redirigido automáticamente al dashboard

3. **Prueba de cierre de sesión**:
   - Haz clic en "Cerrar Sesión" desde el dashboard
   - Verifica que vuelvas a la pantalla de login
   - Intenta acceder al dashboard directamente, no deberías poder
     
## 📱 Responsividad

El diseño se adapta a diferentes tamaños de pantalla:
- Escritorio: diseño completo
- Tablets: ajustes menores de tamaño
- Móviles: reorganización para mejor visualización en pantallas pequeñas

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/feature`)
3. Haz commit de tus cambios (`git commit -m 'Add feature'`)
4. Push a la rama (`git push origin feature/feature`)
5. Abre un Pull Request
