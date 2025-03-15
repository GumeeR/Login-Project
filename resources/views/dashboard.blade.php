<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Dashboard</title>
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">
    <style>
        .dashboard-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            padding: 2rem;
            text-align: center;
        }
        
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #ddd;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-info img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 1rem;
        }
        
        .welcome-text {
            text-align: left;
        }
        
        .welcome-text h3 {
            margin: 0;
            color: var(--primary-color);
        }
        
        .welcome-text p {
            margin: 0;
            font-size: 0.9rem;
            color: #666;
        }
        
        .dashboard-content {
            text-align: left;
        }
        
        #logout-btn .spinner {
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <div class="user-info">
                <img src="{{ asset('images/logo.png') }}" alt="User Avatar">
                <div class="welcome-text">
                    <h3>Bienvenido</h3>
                    <p id="user-email">{{ Auth::user()->email }}</p>
                </div>
            </div>
            <button id="logout-btn">Cerrar Sesión</button>
        </div>
        
        <div class="dashboard-content">
            <h2>Dashboard</h2>
            <p>Funcionalidades proximamente!</p>
            
            <div style="margin-top: 2rem;">
                <h3>Sesión actual</h3>
                <p>Has iniciado sesión correctamente y estás viendo contenido protegido por autenticacion.</p>
                <p>Esta página solo es accesible para usuarios que lograron loguearse.</p>
            </div>
        </div>
    </div>
    
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>
</html>