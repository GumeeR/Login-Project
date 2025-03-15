<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Sistema de Login</title>
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">
</head>
<body>
    <div class="login-container" id="login-form">
        <img src="{{ asset('images/logo.png') }}" alt="Logo de la aplicación">
        <h1>Iniciar Sesión</h1>
        
        @if(session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif
        
        <div class="alert alert-danger" id="login-error" style="display: none;"></div>
        
        <form id="form">
            @csrf
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" placeholder="">
                <div class="error-message" id="email-error"></div>
            </div>
            
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="">
                <div class="error-message" id="password-error"></div>
            </div>
            <button type="submit" id="login-btn">
                Ingresar
            </button>
        </form>
    </div>
    
    <script src="{{ asset('js/login.js') }}"></script>
</body>
</html>