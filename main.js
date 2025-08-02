 // Tab toggle logic
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginSection = document.getElementById('login-section');
        const registerSection = document.getElementById('register-section');

        loginTab.onclick = function() {
            loginTab.classList.add('border-blue-500', 'text-blue-700');
            loginTab.classList.remove('border-transparent');
            registerTab.classList.remove('border-blue-500', 'text-blue-700');
            registerTab.classList.add('border-transparent');
            loginSection.classList.add('active');
            registerSection.classList.remove('active');
        };

        registerTab.onclick = function() {
            registerTab.classList.add('border-blue-500', 'text-blue-700');
            registerTab.classList.remove('border-transparent');
            loginTab.classList.remove('border-blue-500', 'text-blue-700');
            loginTab.classList.add('border-transparent');
            registerSection.classList.add('active');
            loginSection.classList.remove('active');
        }
