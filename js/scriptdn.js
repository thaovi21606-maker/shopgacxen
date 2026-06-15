// Tính năng ẩn/hiện mật khẩu
function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    }
}

// Xử lý Validation và Đăng Nhập
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let isValid = true;

    function showError(id, show) {
        document.getElementById(id).style.display = show ? 'block' : 'none';
        if(show) isValid = false;
    }

    const email = document.getElementById('loginEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    showError('loginEmailError', !emailRegex.test(email));

    const password = document.getElementById('loginPassword').value;
    showError('loginPasswordError', password === "");

    if (isValid) {
        let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
        const matchedUser = users.find(u => u.email === email && u.password === password);

        if (matchedUser) {
            
           
            let now = new Date();
            let timeString = now.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}) + ' - ' + now.toLocaleDateString('vi-VN');

            if (!matchedUser.notifications) matchedUser.notifications = [];

            
            matchedUser.loginCount = (matchedUser.loginCount || 0) + 1;

            if (matchedUser.loginCount > 1) {
                matchedUser.notifications.push({
                    type: 'welcome_back',
                    title: 'Mừng bạn quay trở lại! 💖',
                    content: 'Gác Xen rất vui vì bạn đã quay trở lại. Đừng quên kiểm tra các ưu đãi mới nhất trong "Ví voucher" của bạn nhé!',
                    time: timeString
                });
            }

          
            localStorage.setItem('gacxen_currentUser', JSON.stringify(matchedUser));

            
            const uIndex = users.findIndex(u => u.email === matchedUser.email);
            if(uIndex !== -1) {
                users[uIndex] = matchedUser; 
                localStorage.setItem('gacxen_users', JSON.stringify(users));
            }
           

            alert("Đăng nhập thành công! Đang chuyển hướng về Trang chủ...");
            
            setTimeout(function() {
                window.location.href = 'index.html'; 
            }, 2000);

        } else {
            alert("Email hoặc mật khẩu không chính xác! Hoặc tài khoản chưa được đăng ký.");
        }
    }
});

document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
    e.preventDefault();
    const emailToReset = prompt("Vui lòng nhập email của bạn để lấy lại mật khẩu:");
    if (emailToReset) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailToReset)) {
            alert(`Một đường link khôi phục mật khẩu đã được gửi đến email: ${emailToReset}. Vui lòng kiểm tra hộp thư!`);
        } else {
            alert("Email không đúng định dạng. Vui lòng thử lại!");
        }
    }
});

const btnFacebook = document.querySelector('.btn-fb');
const btnGoogle = document.querySelector('.btn-gg');

function simulateSocialLogin(url, title, providerName) {
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    const popup = window.open(
        url, title, 
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    setTimeout(() => {
        if(popup) popup.close();

        const dummyUser = {
            firstName: 'Khách',
            lastName: providerName,
            email: `user${Date.now()}@${providerName.toLowerCase()}.com`,
            phone: '0900000000',
            password: 'SocialLogin_NoPassword_123!'
        };
        
        let now = new Date();
        let timeString = now.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}) + ' - ' + now.toLocaleDateString('vi-VN');
        dummyUser.notifications = [{
            type: 'welcome',
            title: 'Chào mừng bạn đến với Gác Xen! 🎉',
            content: `Cảm ơn bạn đã đăng nhập bằng ${providerName}. Tặng bạn mã <strong>GACXENNEW</strong> giảm 50K cho đơn hàng đầu tiên. Mua sắm ngay nhé!`,
            time: timeString
        }];

        localStorage.setItem('gacxen_currentUser', JSON.stringify(dummyUser));
        
        alert(`Đăng nhập bằng ${providerName} thành công! Đang chuyển hướng về Trang chủ...`);
       
        setTimeout(function() {
            window.location.href = 'index.html'; 
        }, 2000);

    }, 3000); 
}

if (btnFacebook) {
    btnFacebook.addEventListener('click', function(e) {
        e.preventDefault();
        simulateSocialLogin('https://www.facebook.com/login.php', 'Facebook Login', 'Facebook');
    });
}

if (btnGoogle) {
    btnGoogle.addEventListener('click', function(e) {
        e.preventDefault();
        simulateSocialLogin('https://accounts.google.com/signin', 'Google Login', 'Google');
    });
}