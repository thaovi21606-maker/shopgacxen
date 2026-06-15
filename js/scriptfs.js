document.addEventListener("DOMContentLoaded", function() {
    
    // Lấy toàn bộ sản phẩm trên trang
    const shopItems = document.querySelectorAll('.shop-item');
    
    shopItems.forEach(item => {

        // ==========================================
        // 1. TỰ ĐỘNG CẬP NHẬT CHỨC NĂNG CLICK CHO ẢNH VÀ NÚT
        // ==========================================
        const btn = item.querySelector('.buy-btn');
        const img = item.querySelector('img');

        if (btn && img) {
            // Lấy chuỗi chứa link chi tiết đang nằm ở nút hiện tại
            const onclickAttr = btn.getAttribute('onclick');
            
            if (onclickAttr && onclickAttr.includes('product-detail.html')) {
                // Trích xuất link và ID sản phẩm
                const detailLink = onclickAttr.match(/'([^']+)'/)[1]; 
                const productId = detailLink.split('=')[1]; 

                // Gán chức năng cho Ảnh: Nhảy đến trang chi tiết
                img.setAttribute('onclick', `location.href='${detailLink}'`);
                img.style.cursor = 'pointer'; 
                img.title = "Xem chi tiết sản phẩm";

                // Gán chức năng cho Nút: Thêm vào giỏ và nhảy sang trang giỏ hàng bằng hàm buyNow()
                btn.setAttribute('onclick', `buyNow('${productId}')`);
            }
        }

        // ==========================================
        // 2. XỬ LÝ THANH TIẾN TRÌNH SỐ LƯỢNG ĐÃ BÁN
        // ==========================================
        const soldTextEl = item.querySelector('.sold-count');
        
        if (soldTextEl) {
            
            const randomPercent = Math.floor(Math.random() * 40) + 50; // tỉ lệ bán từ 50% đến 90%
            
            soldTextEl.style.display = 'none';
        
            const progressBarHTML = `
                <div class="fs-progress-container">
                    <div class="fs-progress-bar" style="width: 0%;" data-target="${randomPercent}"></div>
                    <span class="fs-progress-text">Đã bán ${randomPercent}% <i class="fas fa-fire fs-fire-icon"></i></span>
                </div>
            `;
            
            soldTextEl.insertAdjacentHTML('afterend', progressBarHTML);
        }
    });


    // 3. HIỆU ỨNG CHẠY THANH TIẾN TRÌNH
  
    setTimeout(() => {
        const bars = document.querySelectorAll('.fs-progress-bar');
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-target');
            bar.style.width = targetWidth + '%';
           
            if(parseInt(targetWidth) >= 85) {
                bar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
            }
        });
    }, 500);

    // 4. hiệu ứng thông báo người mua 

    const fomoContainer = document.getElementById('fomo-toast-container');
    
    if (fomoContainer) {
    
        const fakeNames = ["Nguyễn Thị A.", "Trần Văn B.", "Lê Hoàng C.", "Phạm Tuyết N.", "Hoàng M.", "Vũ Đức T.", "Đặng Thái H."];
        const fakeBooks = [
            "Thư cho em", 
            "Tư duy nhanh và chậm", 
            "Combo Profit First", 
            "1000 bộ não", 
            "Vì cậu là bạn nhỏ của tớ"
        ];
        
        function showFomoNotification() {
         
            const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
            const randomBook = fakeBooks[Math.floor(Math.random() * fakeBooks.length)];
            const randomTime = Math.floor(Math.random() * 10) + 1; // 1 đến 10 phút trước
         
            const toast = document.createElement('div');
            toast.classList.add('fomo-toast');
            toast.innerHTML = `
                <img src="img/tk.png" alt="User">
                <div class="fomo-text">
                    <p><strong>${randomName}</strong> vừa đặt mua <br> ${randomBook}</p>
                    <span class="fomo-time">${randomTime} phút trước</span>
                </div>
            `;
            
            fomoContainer.appendChild(toast);
      
            setTimeout(() => toast.classList.add('show'), 100);
           
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 4000);
        }

        setTimeout(() => {
            showFomoNotification();
            setInterval(showFomoNotification, Math.floor(Math.random() * 7000) + 8000);
        }, 3000);
    }
});