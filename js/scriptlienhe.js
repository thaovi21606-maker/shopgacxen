    const contactForm = document.getElementById('contactForm');
    const btnSubmitContact = document.getElementById('btnSubmitContact');

    if (contactForm && btnSubmitContact) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
        
            const originalText = btnSubmitContact.innerText;
            btnSubmitContact.innerText = 'Đang gửi đi...';
            btnSubmitContact.classList.add('sending'); 
            setTimeout(() => {

                btnSubmitContact.innerText = originalText;
                btnSubmitContact.classList.remove('sending');
                alert('💖 Cảm ơn bạn! Lời nhắn của bạn đã được gửi đến Gác Xen thành công. Chúng mình sẽ phản hồi sớm nhất nhé!');
                contactForm.reset();
            }, 1500);
        });
    }

    const btnAccount = document.getElementById('btn-account-header');
    const submenu = document.getElementById('accountSubmenu');
    const savedUser = localStorage.getItem('gacxen_currentUser');

    if (btnAccount) {
        if (savedUser) {
            const currentUser = JSON.parse(savedUser);
            const fullName = `${currentUser.lastName} ${currentUser.firstName}`;
            const avatarSrc = currentUser.avatar || 'img/tk.png'; 
            
            btnAccount.innerHTML = `
                <img src="${avatarSrc}" alt="Avatar" style="width: 25px; height: 25px; border-radius: 50%; object-fit: cover; vertical-align: middle; margin-right: 5px;">
                <span style="font-weight: bold; font-size: 14px;">${fullName}</span>
            `;
            btnAccount.href = "taikhoan.html";
            if (submenu) submenu.remove(); 
        } else {
            btnAccount.href = "dangnhap.html";
        }
    }