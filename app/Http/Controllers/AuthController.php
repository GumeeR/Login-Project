<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
        
        return view('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:6'],
        ]);

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            
            if ($request->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => '¡Inicio de sesión exitoso!',
                    'redirect' => route('dashboard')
                ]);
            }
            
            return redirect()->intended('dashboard');
        }

        if ($request->ajax()) {
            return response()->json([
                'success' => false,
                'message' => 'Las credenciales proporcionadas no coinciden con nuestros registros.'
            ], 422);
        }
        
        throw ValidationException::withMessages([
            'email' => ['Las credenciales proporcionadas no coinciden con nuestros registros.'],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        if ($request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Sesión cerrada correctamente',
                'redirect' => route('login')
            ]);
        }
        
        return redirect()->route('login');
    }
    
    public function dashboard()
    {
        return view('dashboard');
    }
}