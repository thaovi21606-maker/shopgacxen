
        if (sessionStorage.getItem('introPlayed')) {
            document.documentElement.classList.add('skip-intro');
        }

window.openSearch = function() {
    document.getElementById("searchSidebar")?.classList.add("active");
    document.getElementById("searchOverlay")?.classList.add("active");
}
window.closeSearch = function() {
    document.getElementById("searchSidebar")?.classList.remove("active");
    document.getElementById("searchOverlay")?.classList.remove("active");
}
document.getElementById("searchOverlay")?.addEventListener("click", closeSearch);

let isAnimating = false;
window.slideRight = function(id) {
    if (isAnimating) return;
    const slider = document.getElementById(id + '-slider');
    if (!slider) return;
    isAnimating = true;
    const firstCard = slider.firstElementChild;
    const amount = firstCard.offsetWidth + 16; 
    slider.style.transition = 'transform 0.4s ease-in-out';
    slider.style.transform = `translateX(-${amount}px)`;
    setTimeout(() => {
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        slider.appendChild(firstCard);
        isAnimating = false;
    }, 400);
}

window.slideLeft = function(id) {
    if (isAnimating) return;
    const slider = document.getElementById(id + '-slider');
    if (!slider) return;
    isAnimating = true;
    const lastCard = slider.lastElementChild;
    const amount = lastCard.offsetWidth + 16;
    slider.style.transition = 'none';
    slider.prepend(lastCard);
    slider.style.transform = `translateX(-${amount}px)`;
    setTimeout(() => {
        slider.style.transition = 'transform 0.4s ease-in-out';
        slider.style.transform = 'translateX(0)';
    }, 20);
    setTimeout(() => { isAnimating = false; }, 420);
}

window.showArrows = function(id) {
    const left = document.getElementById('btn-left-' + id);
    const right = document.getElementById('btn-right-' + id);
    if(left) left.style.display = 'flex';
    if(right) right.style.display = 'flex';
}
window.hideArrows = function(id) {
    const left = document.getElementById('btn-left-' + id);
    const right = document.getElementById('btn-right-' + id);
    if(left) left.style.display = 'none';
    if(right) right.style.display = 'none';
}
window.closePopup = function() {
    const popup = document.getElementById('adPopup');
    if (popup) { popup.style.display = 'none'; document.body.style.overflow = 'auto'; }
}


window.showFlashSale = function() {
    const items = document.querySelectorAll('.shop-item');
    const title = document.getElementById("bannerTitle");
    if (title) title.innerText = "Flash Sale 🔥";
    items.forEach(item => {
        const discount = item.querySelector('.discount-badge');
        item.style.display = discount ? 'block' : 'none';
    });
}

window.updateGlobalCounters = function() {
    var favs = JSON.parse(localStorage.getItem('gacxen_favorites')) || [];
    var favCountEl = document.getElementById('favCount');
    if (favCountEl) favCountEl.innerText = favs.length;

    var cart = JSON.parse(localStorage.getItem('gacxen_cart')) || [];
    var totalCartItems = 0;
    for (var i = 0; i < cart.length; i++) totalCartItems += cart[i].qty;
    var cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.innerText = totalCartItems;
};

window.showGacxenAlert = function(title, message, type = 'success', callback = null) {
    let overlay = document.getElementById('gacxen-modal-overlay') || document.createElement('div');
    overlay.id = 'gacxen-modal-overlay';
    if(!document.getElementById('gacxen-modal-overlay')) document.body.appendChild(overlay);
    
    let icons = { success: 'fa-check', error: 'fa-times', warning: 'fa-exclamation', info: 'fa-info' };
    let iconHtml = `<div class="gx-icon gx-${type}"><i class="fas ${icons[type] || 'fa-info'}"></i></div>`;

    overlay.innerHTML = `
        <div class="gx-modal-box">
            ${iconHtml}
            <h3 class="gx-modal-title">${title}</h3>
            <p class="gx-modal-desc">${message}</p>
            <button class="gx-btn-ok" id="gx-btn-ok">OK</button>
        </div>
    `;
    setTimeout(() => overlay.classList.add('active'), 10);
    document.getElementById('gx-btn-ok').onclick = () => { 
        overlay.classList.remove('active'); 
        if (callback) setTimeout(callback, 300); 
    };
};

window.showGacxenConfirm = function(title, message, onConfirm) {
    let overlay = document.getElementById('gacxen-modal-overlay') || document.createElement('div');
    overlay.id = 'gacxen-modal-overlay';
    if(!document.getElementById('gacxen-modal-overlay')) document.body.appendChild(overlay);

    overlay.innerHTML = `
        <div class="gx-modal-box">
            <div class="gx-icon gx-warning"><i class="fas fa-question"></i></div>
            <h3 class="gx-modal-title">${title}</h3>
            <p class="gx-modal-desc">${message}</p>
            <div class="gx-btn-group">
                <button class="gx-btn-cancel" id="gx-btn-cancel">Hủy</button>
                <button class="gx-btn-confirm" id="gx-btn-confirm">Đồng ý</button>
            </div>
        </div>
    `;
    setTimeout(() => overlay.classList.add('active'), 10);
    document.getElementById('gx-btn-cancel').onclick = () => overlay.classList.remove('active');
    document.getElementById('gx-btn-confirm').onclick = () => {
        overlay.classList.remove('active');
        setTimeout(() => { if (onConfirm) onConfirm(); }, 300);
    };
};

window.alert = function(message) {
    let type = 'info', title = 'THÔNG BÁO', msgStr = String(message).toLowerCase();
    if(msgStr.includes('thành công') || msgStr.includes('cảm ơn') || message.includes('✅')) { type = 'success'; title = 'THÀNH CÔNG!'; } 
    else if(msgStr.includes('lỗi') || msgStr.includes('trống') || msgStr.includes('không hợp lệ') || message.includes('❌') || msgStr.includes('không tìm thấy')) { type = 'error'; title = 'CẢNH BÁO!'; } 
    else if(msgStr.includes('vui lòng')) { type = 'warning'; title = 'LƯU Ý!'; }
    
    let cleanMsg = message.replace(/[✅❌🎉🔒]/g, '').trim();
    showGacxenAlert(title, cleanMsg, type);
};


document.addEventListener('DOMContentLoaded', () => {

    window.updateGlobalCounters();

    const books = [
        { name: "Thư cho em", link: "product-detail.html?id=vh1" },
        { name: "Vì cậu là bạn nhỏ của tớ", link: "product-detail.html?id=vh2" },
        { name: "Vòng tay học trò", link: "product-detail.html?id=vh3" },
        { name: "Vui vẻ không quạu nha", link: "product-detail.html?id=vh4" },
        { name: "Phải lòng với cô đơn", link: "product-detail.html?id=vh5" },
        { name: "Cuộc đời ngắn lắm đừng ôm muộn phiền", link: "product-detail.html?id=vh6" },
        { name: "Combo tối ưu lợi nhuận và doanh thu", link: "product-detail.html?id=sp1" },
        { name: "Nhân dân quyền lực và lợi nhuận", link: "product-detail.html?id=sp2" },
        { name: "Combo chiến lược Marketing Công Nghệ", link: "product-detail.html?id=sp3" },
        { name: "Combo Tư Duy Kiếm Tiền", link: "product-detail.html?id=sp4" },
        { name: "Tinh Thần Nghiệp Chủ", link: "product-detail.html?id=sp5" },
        { name: "Tài chính doanh nghiệp", link: "product-detail.html?id=sp6" },
        { name: "Tư duy nhanh và chậm", link: "product-detail.html?id=tl1" },
        { name: "Thuật ngữ tâm lý học Anh - Việt - Đức - Pháp", link: "product-detail.html?id=tl2" },
        { name: "Liệu pháp tâm lý trị liệu chiến lược", link: "product-detail.html?id=tl3" },
        { name: "Flashcard tư duy lãnh đạo", link: "product-detail.html?id=tl4" },
        { name: "Tư duy phản biện như một luật sư", link: "product-detail.html?id=tl5" },
        { name: "Combo liệu pháp tâm hồn lấp đầy trống rỗng", link: "product-detail.html?id=tl6" },
        { name: "Sự ra đời trí khôn ở trẻ em", link: "product-detail.html?id=kh1" },
        { name: "Triết học của giáo dục", link: "product-detail.html?id=kh2" },
        { name: "1000 bộ não - Lý thuyết mới về trí tuệ con người", link: "product-detail.html?id=kh3" },
        { name: "Một góc nhìn về tiến hóa văn hóa", link: "product-detail.html?id=kh4" },
        { name: "Xây dựng trường học hạnh phúc", link: "product-detail.html?id=kh5" },
        { name: "Hồi ký người thầy xây trường hạnh phúc", link: "product-detail.html?id=kh6" }
    ];

    const sidebarSearchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("searchSuggestions");
    const sidebarSearchFormEl = document.getElementById("sidebarSearchForm");

    if (sidebarSearchInput && suggestionsBox) {
        sidebarSearchInput.addEventListener("input", function() {
            const keyword = this.value.toLowerCase().trim();
            suggestionsBox.innerHTML = ""; 
            if (keyword === "") { suggestionsBox.style.display = "none"; return; }
            
            const filteredBooks = books.filter(book => book.name.toLowerCase().includes(keyword));
            if (filteredBooks.length === 0) { suggestionsBox.style.display = "none"; return; }
            
            filteredBooks.forEach(book => {
                const item = document.createElement("div");
                item.classList.add("suggest-item");
                item.innerHTML = `<i class="fas fa-search" style="color: #999; margin-right: 8px;"></i> ${book.name}`;
                item.onclick = () => window.location.href = book.link;
                suggestionsBox.appendChild(item);
            });
            suggestionsBox.style.display = "block";
        });
    }

if (sidebarSearchFormEl) {
    sidebarSearchFormEl.addEventListener("submit", function(e) {
        e.preventDefault();

        const keyword = sidebarSearchInput.value.toLowerCase().trim();

        if (!keyword) {
            alert("Vui lòng nhập tên sách bạn muốn tìm!");
            return;
        }

        const items = document.querySelectorAll(".shop-item");

        let found = false;

        items.forEach(item => {
            const productName = item
                .querySelector("h3")
                .innerText
                .toLowerCase();

            if (productName.includes(keyword)) {
                item.style.display = "block";
                found = true;
            } else {
                item.style.display = "none";
            }
        });

        if (!found) {
            alert("Không tìm thấy sản phẩm!");
        }
        closeSearch();
    });
}

    const headerSearchForm = document.getElementById('searchForm');
    if (headerSearchForm) {
        headerSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.openSearch();
        });
    }

    function handleIntroLoader() {
        const loader = document.getElementById('intro-loader');
        const loadFill = document.getElementById('load-fill-vip');
        const loadCount = document.getElementById('load-count-vip');
        if (!loader) return;

        const introPlayed = sessionStorage.getItem('introPlayed');

        if (!introPlayed) {
            const duration = 4500; 
            const startTime = Date.now(); 

            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                let progress = (elapsed / duration) * 100;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(timer); 
                    if(loadFill) loadFill.style.width = '100%';
                    if(loadCount) loadCount.innerText = '100%';

                    setTimeout(() => {
                        loader.classList.add('exit-vip'); 
                        
                        setTimeout(() => {
                            loader.style.display = 'none';
                            sessionStorage.setItem('introPlayed', 'true');
                        }, 1200); 
                        
                    }, 600); 

                } else {
                    if(loadFill) loadFill.style.width = progress + '%';
                    if(loadCount) loadCount.innerText = Math.floor(progress) + '%';
                }
            }, 20); 
        } else {
            loader.style.display = 'none';
        }
    }
    handleIntroLoader();

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


    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-menu > li > a').forEach(item => {
        item.classList.remove('active');
        if (currentPath === item.getAttribute('href') || (currentPath === '' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        }
    });

    const btnSubscribe = document.getElementById('btnSubscribe');
    const btnUnsubscribe = document.getElementById('btnUnsubscribe');
    const emailInput = document.getElementById('emailInput');

    function getSubscribedEmails() {
        return JSON.parse(localStorage.getItem('gacxen_subscribedEmails')) || [];
    }
    if (btnSubscribe && emailInput) {
        btnSubscribe.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+$/; 
            
            if (email === "") {
                alert('Vui lòng nhập địa chỉ email của bạn!');
                return;
            }
            if (!emailRegex.test(email)) {
                alert('Email chưa đúng định dạng (cần có ký tự @). Vui lòng kiểm tra lại!');
                return;
            }
            
            let emails = getSubscribedEmails();
            if (emails.includes(email)) {
                alert('Email này đã được đăng ký nhận bản tin từ trước rồi nhé!');
            } else {
                emails.push(email); 
                localStorage.setItem('gacxen_subscribedEmails', JSON.stringify(emails));
                alert('Đăng ký nhận bản tin thành công!');
                emailInput.value = ''; 
            }
        });
    }

    if (btnUnsubscribe && emailInput) {
        btnUnsubscribe.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+$/;

            if (email === "") {
                alert('Vui lòng nhập địa chỉ email bạn muốn hủy đăng ký!');
                return;
            }
            if (!emailRegex.test(email)) {
                alert('Email chưa đúng định dạng (cần có ký tự @). Vui lòng kiểm tra lại!');
                return;
            }
            
            let emails = getSubscribedEmails();
            const emailIndex = emails.indexOf(email);
            
            if (emailIndex === -1) {
                alert('Lỗi: Email này chưa từng được đăng ký nhận bản tin!');
            } else {
                emails.splice(emailIndex, 1);
                localStorage.setItem('gacxen_subscribedEmails', JSON.stringify(emails));
                alert('Bạn đã hủy đăng ký nhận bản tin thành công!');
                emailInput.value = ''; 
            }
        });
    }

    const mainSlider = document.getElementById('bannerSlider');
    const mainSlides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (mainSlider && mainSlides.length > 0) {
        let idx = 0;
        
        function updateMainSlider() {
            mainSlider.style.transform = `translateX(-${idx * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if(dots[idx]) dots[idx].classList.add('active');
        }
        function nextMainSlide() { idx = (idx + 1) % mainSlides.length; updateMainSlider(); }
        function prevMainSlide() { idx = (idx - 1 + mainSlides.length) % mainSlides.length; updateMainSlider(); }

        let autoSlide = setInterval(nextMainSlide, 4000);

        if (nextBtn) nextBtn.addEventListener('click', () => { nextMainSlide(); clearInterval(autoSlide); autoSlide = setInterval(nextMainSlide, 4000); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevMainSlide(); clearInterval(autoSlide); autoSlide = setInterval(nextMainSlide, 4000); });
        
        dots.forEach((dot, dIdx) => {
            dot.addEventListener('click', () => { idx = dIdx; updateMainSlider(); clearInterval(autoSlide); autoSlide = setInterval(nextMainSlide, 4000); });
        });
    }


    setTimeout(() => {
        const popup = document.getElementById('adPopup');
        
        const popupPlayed = sessionStorage.getItem('popupPlayed');

        if (popup && !popupPlayed) {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            sessionStorage.setItem('popupPlayed', 'true');
        }
    }, 6000);

    window.addEventListener('click', (e) => {
        const popup = document.getElementById('adPopup');
        if (e.target === popup) window.closePopup();
    });

    if (document.getElementById("hours")) {
        let endTime = localStorage.getItem("flashsale_end");
        if (!endTime) {
            endTime = new Date().getTime() + 10800 * 1000;
            localStorage.setItem("flashsale_end", endTime);
        } else {
            endTime = parseInt(endTime);
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            if (timeLeft <= 0) {
                localStorage.setItem("flashsale_end", new Date().getTime() + 10800 * 1000);
                location.reload();
                return;
            }

            const countdownEl = document.querySelector(".countdown");
            if (timeLeft < 600000 && countdownEl) countdownEl.style.color = "red";

            let h = Math.floor(timeLeft / (1000 * 60 * 60));
            let m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let s = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("hours").innerText = String(h).padStart(2, '0');
            document.getElementById("minutes").innerText = String(m).padStart(2, '0');
            document.getElementById("seconds").innerText = String(s).padStart(2, '0');
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        const list = document.getElementById("shop-list");
        if(list) {
            const originalItems = Array.from(list.getElementsByClassName("shop-item"));
            sortSelect.addEventListener("change", function () {
                const value = this.value;
                let items = Array.from(list.getElementsByClassName("shop-item"));

                if (value === "default") {
                    list.innerHTML = "";
                    originalItems.forEach(item => list.appendChild(item));
                    return;
                }

                items.sort((a, b) => {
                    const nameA = a.querySelector("h3").innerText.toLowerCase();
                    const nameB = b.querySelector("h3").innerText.toLowerCase();
                    const priceA = parseInt(a.querySelector(".shop-price").innerText.replace(/\D/g, ""));
                    const priceB = parseInt(b.querySelector(".shop-price").innerText.replace(/\D/g, ""));

                    if (value === "name-asc") return nameA.localeCompare(nameB);
                    if (value === "name-desc") return nameB.localeCompare(nameA);
                    if (value === "price-asc") return priceA - priceB;
                    if (value === "price-desc") return priceB - priceA;
                    return 0;
                });

                list.innerHTML = "";
                items.forEach(item => list.appendChild(item));
            });
        }
    }
});

(function syncLanguageCookie() {
    const savedLang = localStorage.getItem("siteLang") || 'vi';
    if (savedLang === 'en') {
        document.cookie = "googtrans=/vi/en; path=/";
        if (window.location.hostname) {
            document.cookie = `googtrans=/vi/en; domain=${window.location.hostname}; path=/`;
        }
    } else {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (window.location.hostname) {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
        }
    }
})();

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'vi',
        includedLanguages: 'en,vi',
        autoDisplay: false
    }, 'google_translate_element');
}

function changeLanguage(lang) {
    localStorage.setItem("siteLang", lang);
    
    if (lang === 'en') {
        document.cookie = "googtrans=/vi/en; path=/";
    } else {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    applyTranslation(lang);
    updateFlagUI(lang);
}

function applyTranslation(lang) {
    let attempts = 0;
    const checkExist = setInterval(function() {
        const select = document.querySelector(".goog-te-combo");
        
        if (select && select.options && select.options.length > 0) {
            const targetValue = (lang === 'vi') ? 'vi' : 'en'; 
            if (select.value !== targetValue) {
                select.value = targetValue;
                select.dispatchEvent(new Event("change", { bubbles: true }));
            }
            clearInterval(checkExist);
        }
        
        attempts++;
        if (attempts > 50) clearInterval(checkExist); // Timeout sau 25s tránh treo trình duyệt
    }, 500);
}

document.addEventListener("DOMContentLoaded", function() {
    const savedLang = localStorage.getItem("siteLang") || 'vi';

    if (savedLang === 'en') {
        applyTranslation('en');
    }
    
    updateFlagUI(savedLang);
});

function updateFlagUI(lang) {
    const mainFlagBtn = document.querySelector('.lang-btn');
    if (!mainFlagBtn) return;
    
    if (lang === 'en') {
        mainFlagBtn.innerHTML = '<img src="img/en-flag.jpg" alt="EN" class="flag-icon"> <i class="fas fa-chevron-down" style="font-size: 10px;"></i>';
    } else {
        mainFlagBtn.innerHTML = '<img src="img/vn-flag.jpg" alt="VN" class="flag-icon"> <i class="fas fa-chevron-down" style="font-size: 10px;"></i>';
    }
}

window.updateGlobalCounters = function() {
    var userStr = localStorage.getItem('gacxen_currentUser');
    var email = userStr ? JSON.parse(userStr).email : 'guest';
    
    if (email === 'guest') {
        document.querySelectorAll('.cart-count').forEach(function(el) {
            el.innerText = '0';
        });
        return;
    }

    var cart = JSON.parse(localStorage.getItem('gacxen_cart_' + email)) || [];
    var favs = JSON.parse(localStorage.getItem('gacxen_favorites_' + email)) || [];
    
    var cartCountEl = document.getElementById('cartCount');
    var favCountEl = document.getElementById('favCount');
    
    if(cartCountEl) cartCountEl.innerText = cart.length;
    if(favCountEl) favCountEl.innerText = favs.length;
};

document.addEventListener("DOMContentLoaded", function() {
    if(typeof window.updateGlobalCounters === 'function') {
        window.updateGlobalCounters();
    }
});

window.getCurrentUserEmail = function() {
    var user = localStorage.getItem('gacxen_currentUser');
    return user ? JSON.parse(user).email : 'guest';
};

window.getIsolatedKey = function(baseKey) {
    return baseKey + '_' + window.getCurrentUserEmail();
};

window.requireLogin = function() {
    if (window.getCurrentUserEmail() === 'guest') {
        alert("⚠️ Bạn phải đăng nhập để thực hiện hành động này!");
        setTimeout(() => { window.location.href = 'dangnhap.html'; }, 2000);
        return false;
    }
    return true;
};

window.updateGlobalCounters = function() {
    if (window.getCurrentUserEmail() === 'guest') {
        document.querySelectorAll('.cart-count').forEach(function(el) { el.innerText = '0'; });
        return;
    }
    
    var cart = JSON.parse(localStorage.getItem(window.getIsolatedKey('gacxen_cart'))) || [];
    var favs = JSON.parse(localStorage.getItem(window.getIsolatedKey('gacxen_favorites'))) || [];
    
    var cartCountEl = document.getElementById('cartCount');
    var favCountEl = document.getElementById('favCount');
    var cartPageCountEl = document.getElementById('cartPageCount');
  
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].qty;
    }
    
    if(cartCountEl) cartCountEl.innerText = totalItems; 
    if(favCountEl) favCountEl.innerText = favs.length;
    
    
if(cartPageCountEl) cartPageCountEl.innerText = totalItems;
};

window.addToCart = function(productId, qty) {
    if (!window.requireLogin()) return; 
    
    qty = qty || 1;
    var cartKey = window.getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(function(c) { return c.id === productId; });
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }
    
    localStorage.setItem(cartKey, JSON.stringify(cart)); 
    window.updateGlobalCounters(); 
    alert("✅ Đã thêm sản phẩm vào giỏ hàng của bạn!");
};

window.addToFav = function(productId) {
    if (!window.requireLogin()) return;

    var favKey = window.getIsolatedKey('gacxen_favorites');
    var favs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (!favs.includes(productId)) {
        favs.push(productId);
        localStorage.setItem(favKey, JSON.stringify(favs));
        alert("❤️ Đã thêm vào danh sách yêu thích!");
    } else {
        alert("Sản phẩm này đã có trong yêu thích!");
    }
    window.updateGlobalCounters();
};

document.addEventListener("DOMContentLoaded", function() {
    window.updateGlobalCounters();
});
window.requireLogin = function() {
    if (window.getCurrentUserEmail() === 'guest') {
        window.showGacxenAlert(
            "THÔNG BÁO", 
            "⚠️ Bạn phải đăng nhập để thực hiện!", 
            "info", 
            function() {
                
                window.location.href = 'dangnhap.html'; 
            }
        );
        return false;
    }
    return true;
};

window.addToCart = function(productId) {
    if (!window.requireLogin()) return; 

var qtyInput = document.getElementById('soluong');    var qty = qtyInput ? parseInt(qtyInput.value) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;

    var cartKey = window.getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(c => c.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty: qty });
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.updateGlobalCounters();
    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
};

window.buyNow = function(productId) {
    if (!window.requireLogin()) return; 

var qtyInput = document.getElementById('soluong');    var qty = qtyInput ? parseInt(qtyInput.value) : 1;
    if (isNaN(qty) || qty < 1) qty = 1;

    var cartKey = window.getIsolatedKey('gacxen_cart'); 
    var cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    var existing = cart.find(c => c.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty: qty });
    
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.location.href = 'giohang.html';
};

window.addToFav = function(productId) {
    if (!window.requireLogin()) return;

    var favKey = window.getIsolatedKey('gacxen_favorites');
    var favs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (!favs.includes(productId)) {
        favs.push(productId);
        localStorage.setItem(favKey, JSON.stringify(favs));
        alert("❤️ Đã thêm vào danh sách yêu thích!");
    } else {
        alert("Sản phẩm đã có trong danh sách yêu thích!");
    }
    window.updateGlobalCounters();
};

window.toggleChatbot = function() {
    const chatbot = document.getElementById('gacxen-chatbot');
    if (chatbot) {
        chatbot.classList.toggle('active');
    }
};

window.sendChatMessage = function() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const rawText = input.value.trim();
    
    if (rawText === '') return;

    messagesContainer.innerHTML += `
        <div class="message user-msg">
            <div class="msg-bubble">${rawText}</div>
        </div>
    `;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const text = rawText.toLowerCase(); 
    let aiResponse = "";

    const bookDatabase = [
        { name: "thư cho em", price: "105.000đ", desc: "cuốn sách này kể về mối tình vượt qua hai thế kỷ của thiếu tướng Hoàng Đan và vợ là đại biểu Quốc hội Nguyễn Thị An Vinh." },
        { name: "vì cậu là bạn nhỏ của tớ", price: "136.000đ", desc: "cuốn sách đầu tay đánh dấu chặng hành trình phát triển, nỗ lực không ngừng nghỉ của Tun Phạm." },
        { name: "vòng tay học trò", price: "119.000đ", desc: "kể về cô giáo Tôn Nữ Quỳnh Trâm quyết định bỏ Sài Gòn hoa lệ lại phía sau để lên Đà Lạt tìm kiếm sự yên bình." },
        { name: "vui vẻ không quạu nha", price: "84.000đ", desc: "cuốn sách giúp bạn thả lỏng và tận hưởng sự vui vẻ, bớt đi những loay hoay mệt nhọc." },
        { name: "phải lòng với cô đơn", price: "144.000đ", desc: "nói về việc con người sinh ra vốn dĩ một mình, học cách làm bạn với chính mình và sự cô đơn." },
        { name: "tài chính doanh nghiệp", price: "472.600đ", desc: "giáo trình tiêu chuẩn và chuyên sâu về cấu trúc vốn, quản trị rủi ro và các quyết định tài chính quan trọng." },
        { name: "tư duy nhanh và chậm", price: "212.000đ", desc: "cuốn sách nổi tiếng về hai hệ thống tư duy chi phối nhận thức và quyết định của con người." },
        { name: "1000 bộ não", price: "320.000đ", desc: "lý thuyết mới mang tính đột phá về trí tuệ con người và cách thức hoạt động thực sự của vỏ não." },
        { name: "sự ra đời trí khôn ở trẻ em", price: "212.000đ", desc: "công trình nghiên cứu kinh điển của Jean Piaget về quá trình hình thành nhận thức ở trẻ nhỏ." }
    ];

    setTimeout(() => {
        let foundBook = bookDatabase.find(b => text.includes(b.name));

        if (foundBook && (text.includes("giá") || text.includes("bao nhiêu") || text.includes("nội dung") || text.includes("giới thiệu"))) {
            aiResponse = `Cuốn sách "${foundBook.name.toUpperCase()}" hiện đang có giá là **${foundBook.price}**. <br><br>📖 **Nội dung:** ${foundBook.desc} <br><br>Bạn có muốn Gác Xen hướng dẫn thêm vào giỏ hàng không ạ? ✨`;
        } 
        else if (text.includes("độ tuổi") || text.includes("cho tuổi")) {
            aiResponse = "Gác Xen có rất nhiều đầu sách phù hợp với các độ tuổi khác nhau ạ! 📚<br><br>- **Trẻ em (Dưới 12 tuổi):** Rất hợp với 'Sự ra đời trí khôn ở trẻ em' giúp bé phát triển nhận thức.<br>- **Tuổi Teen (13-18 tuổi):** Có thể tham khảo 'Vui vẻ không quạu nha' hoặc 'Vì cậu là bạn nhỏ của tớ' rất bắt trend và ý nghĩa.<br>- **Người trưởng thành:** Các tựa sách chữa lành hoặc kinh tế như 'Phải lòng với cô đơn', 'Tư duy nhanh và chậm' sẽ là lựa chọn tuyệt vời.<br><br>Bạn đang muốn tìm sách cho người nhận ở độ tuổi cụ thể nào ạ? 🎁";
        }
        else if (text.includes("chào") || text.includes("hi") || text.includes("hello") || text.includes("ê")) {
            aiResponse = "Chào bạn! Gác Xen có thể giúp gì cho bạn hôm nay? 😺";
        } 
        else if (text.includes("kinh tế") || text.includes("kinh doanh") || text.includes("marketing") || text.includes("làm giàu")) {
            aiResponse = "Gác Xen có rất nhiều sách Kinh tế - Tài chính hay. Mình gợi ý bạn cuốn 'Tài Chính Doanh Nghiệp' hoặc 'Combo Profit First' nhé. Bạn vào mục Sản phẩm để xem chi tiết nha! 📈";
        } 
        else if (text.includes("văn học") || text.includes("tiểu thuyết") || text.includes("truyện")) {
            aiResponse = "Tủ sách Văn học của Gác Xen đang có 'Vòng tay học trò' và 'Thư cho em' rất hot đó ạ. Bạn thích đọc thể loại tình cảm hay chữa lành? 📖";
        } 
        else if (text.includes("tâm lý") || text.includes("chữa lành") || text.includes("kỹ năng") || text.includes("buồn")) {
            aiResponse = "Nếu bạn quan tâm sách Tâm lý, hãy thử 'Liệu pháp tâm hồn' hoặc 'Tư duy nhanh và chậm' nha. Đọc rất thấm và nhẹ nhàng đó ạ! 🧠";
        } 
        else if (text.includes("khoa học") || text.includes("giáo dục")) {
            aiResponse = "Về mảng Khoa học - Giáo dục, cuốn '1000 bộ não' hoặc 'Xây dựng trường học hạnh phúc' đang là Best-seller bên mình đó bạn. 🔬";
        }
        else if (text.includes("ship") || text.includes("giao hàng") || text.includes("phí") || text.includes("vận chuyển")) {
            aiResponse = "Gác Xen hỗ trợ giao qua GHTK, GHN và VNPost ạ. Đặc biệt bên mình đang có mã FREESHIP 25K cho đơn từ 200K nha! 🚚";
        } 
        else if (text.includes("giảm giá") || text.includes("khuyến mãi") || text.includes("voucher") || text.includes("flash") || text.includes("sale")) {
            aiResponse = "Ui nhiều voucher lắm bạn ơi! Đang có Flash Sale giảm tới 30%, và nếu bạn là thành viên mới, nhớ nhập mã 'GACXENNEW' để được giảm thẳng 50K nhé! 🎁";
        } 
        else if (text.includes("giá") || text.includes("bao nhiêu") || text.includes("tiền")) {
            aiResponse = "Giá sách nhà Gác Xen dao động từ 84.000đ đến hơn 500.000đ tùy combo. Bạn có thể hỏi theo cú pháp \"Giá cuốn [Tên sách] là bao nhiêu\" hoặc \"Giới thiệu nội dung cuốn [Tên sách]\" để mình báo cụ thể nha! 💰";
        }
        else if (text.includes("cảm ơn") || text.includes("thank") || text.includes("ok") || text.includes("dạ")) {
            aiResponse = "Dạ không có gì ạ. Chúc bạn một ngày thật vui và chọn được cuốn sách ưng ý tại Gác Xen nha! ❤️";
        } 
        else {
            aiResponse = "Dạ, câu hỏi này hơi khó nên trợ lý AI chưa hiểu trọn vẹn ý bạn. 😿 Bạn có thể hỏi cụ thể hơn về Tên sách, Thể loại (kinh tế, tâm lý...), Phí ship, hoặc Voucher được không ạ?";
        }
        
        messagesContainer.innerHTML += `
            <div class="message bot-msg">
                <div class="msg-bubble">${aiResponse}</div>
            </div>
        `;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600); 
};

window.handleChatEnter = function(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('bxh-list-container');
    const detailContainer = document.getElementById('bxh-detail-container');
    const tabs = document.querySelectorAll('.bxh-tab');
    
    if (!listContainer || !detailContainer || tabs.length === 0) return;

    const bxhData = {
        vanhoc: [
            { id: 'vh1', name: 'Thư cho em', author: 'Hoàng Nam Tiến', publisher: 'Hội Nhà Văn', price: '105.000đ', oldPrice: '150.000đ', discount: '-30%', score: '2559 điểm', image: 'img/Thu-cho-em.jpg', desc: 'Cuốn sách này kể về mối tình vượt qua hai thế kỷ của thiếu tướng Hoàng Đan và vợ là đại biểu Quốc hội Nguyễn Thị An Vinh...' },
            { id: 'vh2', name: 'Vì cậu là bạn nhỏ của tớ', author: 'Tun Phạm', publisher: 'Phụ Nữ Việt Nam', price: '136.000đ', oldPrice: '170.000đ', discount: '-20%', score: '1734 điểm', image: 'img/Vi-cau-la-ban-nho-cua-to.jpg', desc: 'Cuốn sách đầu tay đánh dấu chặng hành trình phát triển, nỗ lực không ngừng nghỉ của Tác giả, MC, Content Creator Tun Phạm...' },
            { id: 'vh3', name: 'Vòng tay học trò', author: 'Nguyễn Thị Hoàng', publisher: 'Hội Nhà Văn', price: '119.000đ', oldPrice: '140.000đ', discount: '-15%', score: '1148 điểm', image: 'img/Vong-tay-hoc-tro.jpg', desc: 'Giữa độ đôi mươi xuân sắc, cô giáo Tôn Nữ Quỳnh Trâm quyết định bỏ Sài Gòn hoa lệ lại phía sau để lên Đà Lạt tìm kiếm sự yên bình...' },
            { id: 'vh4', name: 'Vui vẻ không quạu nha', author: 'Ở Đây Zui Nè', publisher: 'Phụ Nữ Việt Nam', price: '84.000đ', oldPrice: '120.000đ', discount: '-30%', score: '1046 điểm', image: 'img/Vui-ve-khong-quau-nha.jpg', desc: 'Thả lỏng và tận hưởng sự vui vẻ đi. Vì chẳng phải cuộc đời đang ghét bạn đâu, mà chính bạn đang loay hoay với những mệt nhọc...' },
            { id: 'vh5', name: 'Phải lòng với cô đơn', author: 'Kulzsc', publisher: 'Phụ Nữ Việt Nam', price: '144.000đ', oldPrice: '180.000đ', discount: '-20%', score: '978 điểm', image: 'img/Phai-long-voi-co-don.jpg', desc: 'Từ cổ chí kim, con người ta sinh ra vốn đã một mình, có người bầu bạn thì tốt mà không có cũng chẳng sao.' }
        ],
        kinhte: [
            { id: 'sp1', name: 'Combo Profit First + Đừng Bán Sản Phẩm', author: 'Mike Michalowicz', publisher: 'NXB Công Thương', price: '334.400đ', oldPrice: '418.000đ', discount: '-20%', score: '2410 điểm', image: 'img/Combo-Toi-Uu-Loi-Nhuan-amp-Doanh-Thu-Profit-First-Dung-Ban-San-Pham-Hay-Ban-Giai-Phap.jpg', desc: 'Cuốn sách tập trung vào phương pháp quản lý tài chính giúp các doanh nghiệp nhỏ thoát khỏi vòng xoáy phá sản.' },
            { id: 'sp2', name: 'Nhân dân quyền lực và lợi nhuận', author: 'Joseph E. Stiglitz', publisher: 'NXB Tri Thức', price: '199.750đ', oldPrice: '235.000đ', discount: '-15%', score: '1890 điểm', image: 'img/Nhan-Dan-Quyen-Luc-Va-Loi-Nhuan-Joseph-E-Stiglitz-NXB-Tri-Thuc.jpg', desc: 'Tác phẩm kinh tế – chính trị quan trọng mang đến cái nhìn sâu sắc về xã hội và sự phân bổ quyền lực, lợi nhuận.' },
            { id: 'sp3', name: 'Combo chiến Lược Marketing Công Nghệ', author: 'Geoffrey A Moore', publisher: 'NXB Công Thương', price: '542.400đ', oldPrice: '678.000đ', discount: '-20%', score: '1502 điểm', image: 'img/Cong-Thuc-Tech-Biz-Chien-Luoc-Marketing-Cho-Thi-Truong-Cong-Nghe-Nghe-Thuat-Thiet-Ke-Game.jpg', desc: 'Khám phá bí mật nghệ thuật thiết kế game và chiến lược marketing độc đáo áp dụng cho thị trường công nghệ số...' },
            { id: 'sp4', name: 'Combo Tư Duy Kiếm Tiền - Thay Đổi Tí Hon', author: 'David Bach', publisher: 'NXB Công Thương', price: '295.800đ', oldPrice: '348.000đ', discount: '-15%', score: '1240 điểm', image: 'img/Combo-Tu-Duy-Trieu-Phu-Tu-Than-Thay-Doi-Ti-Hon-R-I-C-H-Mua-Ban-Doanh-Nghiep.jpg', desc: 'Những thay đổi tí hon mang lại sự giàu có bất ngờ. Bộ sách giúp bạn rèn luyện tư duy tỷ phú từ những thói quen hàng ngày.' },
            { id: 'sp6', name: 'Tài Chính Doanh Nghiệp', author: 'Stephen Ross', publisher: 'Kinh tế TP HCM', price: '472.600đ', oldPrice: '556.000đ', discount: '-15%', score: '980 điểm', image: 'img/tai-chinh-doanh-nghiep.jpg', desc: 'Giáo trình tiêu chuẩn và chuyên sâu về cấu trúc vốn, quản trị rủi ro và các quyết định tài chính quan trọng trong doanh nghiệp.' }
        ],
        tamly: [
            { id: 'tl1', name: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', publisher: 'NXB Thế Giới', price: '212.000đ', oldPrice: '265.000đ', discount: '-20%', score: '2800 điểm', image: 'img/Tu-duy-nhanh-va-cham.jpg', desc: 'Cuốn sách nổi tiếng về hai hệ thống tư duy chi phối nhận thức và quyết định của con người: Hệ thống 1 nhanh, cảm tính; Hệ thống 2 chậm, logic.' },
            { id: 'tl2', name: 'Thuật ngữ tâm lý học', author: 'Hoàng Hưng', publisher: 'NXB Tri Thức', price: '340.000đ', oldPrice: '400.000đ', discount: '-15%', score: '1950 điểm', image: 'img/Thuat-Ngu-Tam-Li-Hoc-Anh-Viet-Duc-Phap.jpg', desc: 'Từ điển thuật ngữ Tâm lý học đối chiếu 4 ngôn ngữ Anh - Việt - Đức - Pháp, tài liệu quý giá cho người nghiên cứu chuyên ngành.' },
            { id: 'tl3', name: 'Liệu pháp tâm lý trị liệu chiến lược', author: 'Jay Haley', publisher: 'NXB Tri Thức', price: '161.000đ', oldPrice: '230.000đ', discount: '-30%', score: '1620 điểm', image: 'img/Lieu-Phap-Tam-Li-Tri-Lieu-Chien-Luoc-Jay-Haley-amp-Madeleine.jpg', desc: 'Hướng dẫn các kỹ thuật trị liệu tâm lý chiến lược giúp thay đổi hành vi và giải quyết các vấn đề tâm lý phức tạp.' },
            { id: 'tl5', name: 'Tư duy phản biện như một luật sư', author: 'Colin Seale', publisher: 'NXB Tri Thức', price: '182.750đ', oldPrice: '215.000đ', discount: '-15%', score: '1310 điểm', image: 'img/Tu-duy-phan-bien-nhu-mot-luat-su.jpg', desc: 'Học cách lập luận, phân tích vấn đề và tư duy sắc bén như một luật sư chuyên nghiệp để ứng dụng vào đời sống.' },
            { id: 'tl6', name: 'Combo liệu pháp tâm hồn lấp đầy', author: 'Patricia d’Angeli', publisher: 'NXB Dân Trí', price: '245.000đ', oldPrice: '350.000đ', discount: '-30%', score: '1105 điểm', image: 'img/Combo-lieu-phap-tam-hon-lap-day-trong-rong-thien-tri-thuc.jpg', desc: 'Bộ sách chữa lành giúp bạn vượt qua những khoảng trống nội tâm, tìm lại sự bình yên và thấu hiểu chính mình.' }
        ],
        khoahoc: [
            { id: 'kh3', name: '1000 bộ não - Lý thuyết mới', author: 'Jeff Hawkins', publisher: 'NXB Thế Giới', price: '320.000đ', oldPrice: '400.000đ', discount: '-20%', score: '2100 điểm', image: 'img/1000 Bo-nao-ly-thuyet-moi-ve-tri-tue-con-nguoi.jpg', desc: 'Lý thuyết mới mang tính đột phá về trí tuệ con người và cách thức hoạt động thực sự của vỏ não hệ thần kinh.' },
            { id: 'kh1', name: 'Sự ra đời trí khôn ở trẻ em', author: 'Jean Piaget', publisher: 'NXB Tri Thức', price: '212.000đ', oldPrice: '265.000đ', discount: '-20%', score: '1840 điểm', image: 'img/Su-Ra-Doi-Tri-Khon-O-Tre-Em-Jean-Piaget-NXB-Tri-Thuc.jpg', desc: 'Công trình nghiên cứu kinh điển của Jean Piaget về quá trình hình thành nhận thức và trí thông minh ở trẻ nhỏ.' },
            { id: 'kh5', name: 'Xây dựng trường học hạnh phúc', author: 'Nguyễn Văn Hòa', publisher: 'NXB Dân Trí', price: '187.000đ', oldPrice: '220.000đ', discount: '-15%', score: '1560 điểm', image: 'img/xay-dung-truong-hoc-hanh-phuc-con-duong-toi-di.jpg', desc: 'Chia sẻ kinh nghiệm thực tiễn và tâm huyết của những người làm giáo dục trong việc kiến tạo môi trường học đường hạnh phúc.' },
            { id: 'kh2', name: 'Triết học của giáo dục', author: 'Richard Pring', publisher: 'NXB Tri Thức', price: '184.000đ', oldPrice: '230.000đ', discount: '-20%', score: '1320 điểm', image: 'img/Triet-Hoc-Cua-Giao-Duc-Richard-Pring-NXB-Tri-Thuc.jpg', desc: 'Góc nhìn triết học sâu sắc về bản chất, mục tiêu và giá trị cốt lõi của nền giáo dục đối với sự phát triển con người.' },
            { id: 'kh6', name: 'Hồi ký người thầy xây trường', author: 'Nguyễn Văn Hòa', publisher: 'NXB Dân Trí', price: '208.250đ', oldPrice: '245.000đ', discount: '-15%', score: '980 điểm', image: 'img/Hoi-ky-nguoi-thay-xay-truong-hanh-phuc.jpg', desc: 'Những câu chuyện xúc động và truyền cảm hứng từ hồi ký của người thầy dành cả đời cống hiến cho sự nghiệp giáo dục.' }
        ]
    };

    function renderDetail(book) {
        detailContainer.innerHTML = `
            <img src="${book.image}" alt="${book.name}" class="bxh-detail-img">
            <div class="bxh-detail-info">
                <h2 class="bxh-detail-title">${book.name}</h2>
                <div class="bxh-detail-meta">
                    Tác giả: ${book.author} <br>
                    Nhà xuất bản: ${book.publisher}
                </div>
                <div class="bxh-detail-price">
                    <span class="bxh-current-price">${book.price}</span>
                    <span class="bxh-old-price">${book.oldPrice}</span>
                    <span class="bxh-discount">${book.discount}</span>
                </div>
                <div class="bxh-desc">
                    <h3>${book.name.toUpperCase()}</h3>
                    <p>${book.desc}</p>
                </div>
                <button onclick="location.href='product-detail.html?id=${book.id}'" style="margin-top: 15px; background: #ff4d6d; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; font-weight: bold;">XEM CHI TIẾT</button>
            </div>
        `;
    }

    function renderList(category) {
        listContainer.innerHTML = ''; 
        const books = bxhData[category];
        
        books.forEach((book, index) => {
            const item = document.createElement('div');
            item.className = 'bxh-item' + (index === 0 ? ' active' : '');
            item.innerHTML = `
                <div class="bxh-rank">
                    <span class="bxh-rank-num">0${index + 1}</span>
                    <span class="bxh-rank-arrow">↑</span>
                </div>
                <img src="${book.image}" class="bxh-item-img" alt="${book.name}">
                <div class="bxh-item-info">
                    <h4>${book.name}</h4>
                    <p>${book.author}</p>
                    <span class="bxh-item-score">${book.score}</span>
                </div>
            `;

          
            item.addEventListener('mouseenter', () => {
                document.querySelectorAll('.bxh-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                renderDetail(book);
            });

           
            item.addEventListener('click', () => {
                location.href = `product-detail.html?id=${book.id}`;
            });

            listContainer.appendChild(item);
        });

    
        renderDetail(books[0]);
    }
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
        
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-tab');
            renderList(selectedCategory);
        });
    });

    renderList('vanhoc');
});


window.submitReview = function(event) {
    if (event) event.preventDefault(); 
    if (!window.requireLogin()) return false; 

    const nameInput = document.getElementById("review-name");
    const starSelect = document.getElementById("review-star");
    const textInput = document.getElementById("review-text");

    if(!nameInput || !starSelect || !textInput) return false;

    const name = nameInput.value.trim();
    const star = starSelect.value;
    const text = textInput.value.trim();

    if (name === "" || text === "") {
        alert("❌ Bạn chưa nhập đủ nội dung đánh giá!"); 
        return false;
    }

    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const reviewHTML = `
    <div class="review-item">
        <div class="review-top">
            <div>
                <strong>${name}</strong>
                <div class="review-date">${currentDate}</div>
            </div>
            <span class="review-star">${star}</span>
        </div>
        <p class="review-content">${text}</p>
    </div>
    `;

    document.getElementById("review-list").innerHTML += reviewHTML;

    alert("✅ Đánh giá của bạn đã được gửi thành công! Cảm ơn bạn.");
    textInput.value = "";
    
    return false;
};

document.addEventListener('DOMContentLoaded', function() {
    const dropdownWrappers = document.querySelectorAll('.dropdown, .lang-dropdown, .account-wrapper');

    dropdownWrappers.forEach(function(wrapper) {
        wrapper.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const isAccountWrapper = this.classList.contains('account-wrapper');
                const isLoggedIn = localStorage.getItem('gacxen_currentUser') !== null;
                if (isAccountWrapper && isLoggedIn) {
                    return; 
                }
                if (e.target.closest('.dropdown-menu, .account-submenu, .lang-menu')) {
                    return; 
                }
                if (!this.classList.contains('active')) {
                    e.preventDefault(); 
                  
                    dropdownWrappers.forEach(w => { 
                        if (w !== this) w.classList.remove('active'); 
                    });
                    
                    this.classList.add('active'); 
                } 
                
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInside = e.target.closest('.dropdown, .lang-dropdown, .account-wrapper');
            if (!isClickInside) {
                dropdownWrappers.forEach(w => w.classList.remove('active'));
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    showToastNotifications();
});

function showToastNotifications() {
    let savedUser = localStorage.getItem('gacxen_currentUser');
    if (!savedUser) return;
    let currentUser = JSON.parse(savedUser);

    if (currentUser.notifications && currentUser.notifications.length > 0) {
        
        let unshownNotis = currentUser.notifications.filter(n => !n.isPopupShown);
        
        if (unshownNotis.length > 0) {
            let toastContainer = document.getElementById('gacxen-toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'gacxen-toast-container';
                toastContainer.style.cssText = 'position: fixed; top: 100px; right: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 15px;';
                document.body.appendChild(toastContainer);
            }

            unshownNotis.forEach((noti, index) => {
                setTimeout(() => {
                    let bgColor = noti.type === 'welcome' ? '#f65385' : (noti.type === 'welcome_back' ? '#27ae60' : '#f47920');
                    let iconClass = noti.type === 'welcome' ? 'fa-gift' : (noti.type === 'welcome_back' ? 'fa-heart' : 'fa-box');

                    let toast = document.createElement('div');
                  
                    toast.style.cssText = `background: #fff; border-left: 5px solid ${bgColor}; box-shadow: 0 5px 25px rgba(0,0,0,0.15); padding: 15px 20px; border-radius: 8px; width: 320px; transform: translateX(150%); transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); display: flex; align-items: flex-start; gap: 15px; font-family: 'Quicksand', sans-serif; cursor: pointer;`;
                    
                    toast.innerHTML = `
                        <div style="background: ${bgColor}; color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;">
                            <i class="fas ${iconClass}"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #333; font-size: 15px; font-weight: 700;">${noti.title}</h4>
                            <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.4;">${noti.content}</p>
                        </div>
                    `;

                    toast.onclick = function() {
                        window.location.href = 'taikhoan.html';
                    };

                    toastContainer.appendChild(toast);
                   
                    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 50);

                    setTimeout(() => {
                        toast.style.transform = 'translateX(150%)';
                        setTimeout(() => { toast.remove(); }, 600);
                    }, 5000);
                    
                }, index * 800);
            });

            currentUser.notifications.forEach(n => n.isPopupShown = true);
            localStorage.setItem('gacxen_currentUser', JSON.stringify(currentUser));
           
            let users = JSON.parse(localStorage.getItem('gacxen_users')) || [];
            const uIndex = users.findIndex(u => u.email === currentUser.email);
            if (uIndex !== -1) {
                users[uIndex].notifications = currentUser.notifications;
                localStorage.setItem('gacxen_users', JSON.stringify(users));
            }
        }
    }
}

