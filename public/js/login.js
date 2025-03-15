document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
    
    checkLocalSession();

    function checkLocalSession() {
        const userEmail = localStorage.getItem('userEmail');
        
        if (userEmail && window.location.pathname !== '/dashboard') {
            loginError.className = 'alert alert-success';
            loginError.textContent = 'Sesión detectada. Redirigiendo...';
            loginError.style.display = 'block';
            
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }
    }
    
    function handleLogin(e) {
        e.preventDefault();
        
        resetErrors();
        
        let isValid = validateForm();
        
        if (isValid) {
            showLoading(true);
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/login', true);
            xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Accept', 'application/json');
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    showLoading(false);
                    
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            
                            if (data.success) {
                                localStorage.setItem('userEmail', emailInput.value);
                                
                                loginError.className = 'alert alert-success';
                                loginError.textContent = data.message || 'Inicio de sesión exitoso';
                                loginError.style.display = "block";
                                
                                setTimeout(() => {
                                    window.location.href = data.redirect;
                                }, 1000);
                            } else {
                                loginError.className = 'alert alert-danger';
                                loginError.textContent = data.message || 'Error de autenticación';
                                loginError.style.display = "block";
                            }
                        } catch (e) {
                            console.error('Error al procesar respuesta:', e);
                            loginError.className = 'alert alert-danger';
                            loginError.textContent = "Error al procesar la respuesta del servidor";
                            loginError.style.display = "block";
                            
                            if (xhr.status === 200) {
                                localStorage.setItem('userEmail', emailInput.value);
                                window.location.href = '/dashboard';
                            }
                        }
                    } else {
                        try {
                            const errorData = JSON.parse(xhr.responseText);
                            loginError.className = 'alert alert-danger';
                            loginError.textContent = errorData.message || "Error de autenticación";
                            loginError.style.display = "block";
                        } catch (e) {
                            loginError.className = 'alert alert-danger';
                            loginError.textContent = "Error en la comunicación con el servidor. Código: " + xhr.status;
                            loginError.style.display = "block";
                        }
                        console.error('Error HTTP:', xhr.status);
                        
                        setTimeout(() => {
                            form.method = 'post';
                            form.action = '/login';
                            
                            let tokenInput = form.querySelector('input[name="_token"]');
                            if (!tokenInput) {
                                tokenInput = document.createElement('input');
                                tokenInput.type = 'hidden';
                                tokenInput.name = '_token';
                                tokenInput.value = csrfToken;
                                form.appendChild(tokenInput);
                            }
                            
                            form.submit();
                        }, 2000);
                    }
                }
            };
            
            xhr.onerror = function() {
                showLoading(false);
                loginError.className = 'alert alert-danger';
                loginError.textContent = "Error de conexión. Verificando estado de sesión...";
                loginError.style.display = "block";
                
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            };
            
            const formData = new FormData(form);
            xhr.send(formData);
        }
    }
    
    function validateForm() {
        let isValid = true;
        
        if (!emailInput.value) {
            showError(emailError, "El correo electrónico es obligatorio");
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailError, "Por favor, ingrese un correo electrónico válido");
            isValid = false;
        }
        
        if (!passwordInput.value) {
            showError(passwordError, "La contraseña es obligatoria");
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordError, "La contraseña debe tener al menos 6 caracteres");
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.style.display = "block";
    }
    
    function resetErrors() {
        emailError.style.display = "none";
        passwordError.style.display = "none";
        loginError.style.display = "none";
    }
    
    function showLoading(isLoading) {
        if (isLoading) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<div class="spinner" style="display: inline-block;"></div> Procesando...';
        } else {
            loginBtn.disabled = false;
            loginBtn.innerHTML = "Iniciar Sesión";
        }
    }
});