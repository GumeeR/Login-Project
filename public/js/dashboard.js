document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const userEmailElement = document.getElementById('user-email');
    
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
    displayUserEmail();
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    function displayUserEmail() {
        if (userEmailElement) {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                userEmailElement.textContent = userEmail;
            }
        }
    }
    
    function handleLogout(e) {
        e.preventDefault();
        
        logoutBtn.disabled = true;
        logoutBtn.innerHTML = '<div class="spinner" style="display: inline-block;"></div> Cerrando sesión...';
        
        const logoutForm = document.createElement('form');
        logoutForm.method = 'POST';
        logoutForm.action = '/logout';
        logoutForm.style.display = 'none';
        
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = '_token';
        tokenInput.value = csrfToken;
        logoutForm.appendChild(tokenInput);
        
        const ajaxInput = document.createElement('input');
        ajaxInput.type = 'hidden';
        ajaxInput.name = 'ajax';
        ajaxInput.value = '1';
        logoutForm.appendChild(ajaxInput);
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout', true);
        xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Accept', 'application/json');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        
                        localStorage.removeItem('userEmail');
                        
                        alert(data.message || 'Sesión cerrada correctamente');
                        
                        window.location.href = data.redirect || '/';
                    } catch (e) {
                        console.error('Error al procesar respuesta:', e);
                        
                        if (xhr.status === 200) {
                            localStorage.removeItem('userEmail');
                            window.location.href = '/';
                        } else {
                            alert('Error al cerrar sesión. Intente nuevamente.');
                            logoutBtn.disabled = false;
                            logoutBtn.innerHTML = 'Cerrar Sesión';
                            
                            document.body.appendChild(logoutForm);
                            logoutForm.submit();
                        }
                    }
                } else {
                    console.error('Error HTTP:', xhr.status);
                    alert('Error al cerrar sesión. Intente nuevamente.');
                    logoutBtn.disabled = false;
                    logoutBtn.innerHTML = 'Cerrar Sesión';

                    document.body.appendChild(logoutForm);
                    logoutForm.submit();
                }
            }
        };
        
        xhr.onerror = function() {
            console.error('Error de conexión');
            alert('Error de conexión al servidor. Intente nuevamente.');
            logoutBtn.disabled = false;
            logoutBtn.innerHTML = 'Cerrar Sesión';
            
            localStorage.removeItem('userEmail');
            
            document.body.appendChild(logoutForm);
            logoutForm.submit();
        };
        
        const formData = new FormData();
        formData.append('_token', csrfToken);
        xhr.send(formData);
    }
});