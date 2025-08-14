document.addEventListener('DOMContentLoaded', () => {
    // Tab toggle logic
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginTab) {
        loginTab.onclick = function() {
            loginTab.classList.add('border-blue-500', 'text-blue-700');
            loginTab.classList.remove('border-transparent');
            registerTab.classList.remove('border-blue-500', 'text-blue-700');
            registerTab.classList.add('border-transparent');
            loginSection.classList.add('active');
            registerSection.classList.remove('active');
        };
    }

    if (registerTab) {
        registerTab.onclick = function() {
            registerTab.classList.add('border-blue-500', 'text-blue-700');
            registerTab.classList.remove('border-transparent');
            loginTab.classList.remove('border-blue-500', 'text-blue-700');
            loginTab.classList.add('border-transparent');
            registerSection.classList.add('active');
            loginSection.classList.remove('active');
        };
    }

    // Registration logic
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Registration successful! Please login.');
            // Switch to login tab
            loginTab.click();
        });
    }

    // Login logic
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                window.location.href = 'Budget-Buddy.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Expense tracking logic
    const expenseForm = document.getElementById('expense-form');
    const expensesList = document.querySelector('#recent-expenses tbody');
    const spendingSummaryList = document.getElementById('expenses-list');

    const renderExpenses = () => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        if (expensesList) {
            expensesList.innerHTML = '';
            expenses.forEach(expense => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-4 py-2 border-b">${expense.name}</td>
                    <td class="px-4 py-2 border-b">$${expense.amount}</td>
                    <td class="px-4 py-2 border-b">${expense.category}</td>
                    <td class="px-4 py-2 border-b">${expense.date}</td>
                `;
                expensesList.appendChild(row);
            });
        }
        if (spendingSummaryList) {
            spendingSummaryList.innerHTML = '';
            const categories = {};
            expenses.forEach(expense => {
                if (categories[expense.category]) {
                    categories[expense.category] += parseFloat(expense.amount);
                } else {
                    categories[expense.category] = parseFloat(expense.amount);
                }
            });

            for (const category in categories) {
                const li = document.createElement('li');
                li.textContent = `${category}: $${categories[category].toFixed(2)}`;
                spendingSummaryList.appendChild(li);
            }
        }
    };

    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('expense-name').value;
            const amount = document.getElementById('expense-amount').value;
            const date = document.getElementById('expense-date').value;
            const category = document.getElementById('expense-category').value;

            if (name && amount && date && category) {
                const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
                expenses.push({ name, amount, date, category });
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses();
                expenseForm.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }

    // Initial render of expenses on page load
    renderExpenses();
});
