document.addEventListener('DOMContentLoaded', () => {

    const currentPath = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.nav-menu > li > a');

    menuItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        item.classList.remove('active');
        if (currentPath === itemHref || (currentPath === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });

    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = '0.3s';
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const policyParam = urlParams.get('policy'); 

    if (policyParam) {
        
        const mainContent = document.getElementById('mainAboutContent');
        if (mainContent) mainContent.style.display = 'none';

        const policyViewer = document.getElementById('policyViewer');
        if (policyViewer) policyViewer.style.display = 'block';

        const allPolicies = document.querySelectorAll('.policy-data');
        allPolicies.forEach(p => p.style.display = 'none');

        const targetPolicy = document.getElementById('policy-' + policyParam);
        if (targetPolicy) {
            targetPolicy.style.display = 'block';
  
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

const articlesData = {
    'news1': {
        img: 'img/news1.jpg',
        meta: '<i class="far fa-calendar-alt"></i> 15 Tháng 05, 2026 | Sự kiện Offline',
        title: 'Hội thảo: Chữa lành bằng những trang sách cùng Tác giả Nguyễn Thị Hoàng',
        content: `
            <p>Vào cuối tuần qua, Gác Xen đã tổ chức thành công buổi hội thảo mang tên "Chữa Lành Bằng Những Trang Sách" với sự góp mặt của hơn 100 độc giả yêu sách tại TP.HCM. Không gian quán được lấp đầy bởi ánh đèn vàng ấm áp và những ánh mắt say sưa.</p>
            <p>Diễn giả khách mời đã có những chia sẻ sâu sắc về cách văn học đương đại giúp con người đối diện với những tổn thương tinh thần. Không chỉ là nơi để đọc, Gác Xen mong muốn tạo ra một "trạm sạc" cảm xúc, nơi mọi người có thể ngồi lại, nhâm nhi tách trà và tìm thấy sự đồng cảm qua từng con chữ.</p>
            <blockquote>"Sách không chỉ cung cấp kiến thức, sách còn là một người bạn tĩnh lặng, sẵn sàng lắng nghe và xoa dịu những ngổn ngang trong lòng bạn." - Trích lời diễn giả.</blockquote>
            <p>Cuối chương trình, các độc giả đã có cơ hội giao lưu, ký tặng sách và nhận những phần quà nhỏ là các tấm bookmark gỗ khắc tên riêng từ Gác Xen. Hẹn gặp lại các bạn ở những sự kiện tiếp theo nhé!</p>
        `
    },
    'news2': {
        img: 'img/news2.jpg',
        meta: '<i class="fas fa-bullhorn"></i> 22 Tháng 05, 2026 | Tin tức nội bộ',
        title: 'Gác Xen chính thức trở thành đối tác phân phối sách giới hạn',
        content: `
            <p>Tháng 5 này mang đến một cột mốc đặc biệt! Gác Xen vô cùng tự hào thông báo chúng mình đã chính thức ký kết hợp tác phân phối các ấn bản sách giới hạn (Limited Edition) từ các nhà xuất bản hàng đầu như Nhã Nam, NXB Trẻ và Kim Đồng.</p>
            <p>Điều này có nghĩa là gì đối với các "mọt sách" nhà Gác Xen?</p>
            <p>Từ nay, các bạn sẽ có cơ hội sở hữu những ấn bản bìa cứng bọc vải, sách có chữ ký trực tiếp của tác giả, hoặc các bản in có đánh số thứ tự độc nhất vô nhị ngay tại website Gacxen.vn mà không cần phải chờ đợi xếp hàng hay săn lùng vất vả.</p>
            <p>Đợt mở bán ấn bản đặc biệt đầu tiên sẽ diễn ra vào ngày 01/06 tới đây. Đừng quên bật thông báo và kiểm tra email thường xuyên để không bỏ lỡ những siêu phẩm này nhé!</p>
        `
    },
    'news3': {
        img: 'img/news3.jpg',
        meta: '<i class="fas fa-palette"></i> 02 Tháng 06, 2026 | Workshop',
        title: 'Workshop cuối tuần: Tự tay làm Bookmark Vintage dành cho độc giả',
        content: `
            <p>Bạn đã chán những chiếc thẻ kẹp sách bằng giấy in sẵn? Hãy đến Gác Xen cuối tuần này để tự tay sáng tạo cho mình một chiếc bookmark mang đậm dấu ấn cá nhân!</p>
            <p>Gác Xen sẽ chuẩn bị sẵn mọi nguyên vật liệu mang phong cách Vintage: giấy Kraft nhám cứng cáp, hoa lá khô ép thủ công, ruy băng lụa, dây cói, con dấu sáp (wax seal) và cả những chiếc máy đánh chữ cổ điển để bạn tự in những câu quote yêu thích lên bookmark của mình.</p>
            <blockquote>Sự kiện hoàn toàn MIỄN PHÍ dành cho khách hàng đã có thẻ thành viên tại Gác Xen (Hạng Bạc trở lên).</blockquote>
            <p><strong>Thời gian:</strong> 09:00 - 11:30, Chủ nhật ngày 10/06/2026.<br>
            <strong>Địa điểm:</strong> Tầng 2, Không gian Gác Xen - 12 Nguyễn Văn Bảo, Gò Vấp.</p>
            <p>Vì không gian có hạn để đảm bảo trải nghiệm tốt nhất, chúng mình chỉ nhận tối đa 20 bạn đăng ký sớm nhất. Nhanh tay inbox fanpage để giữ chỗ nhé!</p>
        `
    },
    'review1': {
        img: 'img/sach1.jpg',
        meta: '<i class="fas fa-pen-nib"></i> Review bởi Minh Anh | <i class="fas fa-star" style="color:#ffb400"></i> Đề cử',
        title: '[Review] Đường Xưa Mây Trắng - Thích Nhất Hạnh',
        content: `
            <p>Thật khó để tìm được một cuốn sách viết về cuộc đời Đức Phật lại mang đậm chất thơ và gần gũi đến thế. Không mang màu sắc tôn giáo nặng nề hay những giáo lý khô khan, "Đường Xưa Mây Trắng" của Thiền sư Thích Nhất Hạnh giống như một câu chuyện cổ tích êm đềm, kể về hành trình của một con người bình thường từng bước tìm ra con đường tỉnh thức.</p>
            <p>Đọc cuốn sách này, mình có cảm giác như đang được ngồi dưới gốc cây Bồ Đề, tận hưởng làn gió mát và nghe Thầy kể chuyện. Ngôn từ dung dị, trong sáng của Thầy có một sức mạnh chữa lành kỳ lạ. Nó làm dịu đi những xáo trộn, lo âu trong những ngày mình thấy chênh vênh nhất.</p>
            <blockquote>"Chỉ khi tâm ta tĩnh lặng, ta mới có thể nhìn thấu sự thật của vạn vật."</blockquote>
            <p>Nếu bạn đang tìm kiếm một bến đỗ bình yên cho tâm hồn, hay chỉ đơn giản là muốn hiểu thêm về triết lý sống từ bi, hỉ xả, thì đây chắc chắn là cuốn sách "phải đọc" ít nhất một lần trong đời.</p>
        `
    },
    'review2': {
        img: 'img/sach2.jpg',
        meta: '<i class="fas fa-pen-nib"></i> Review bởi Thùy Vy | Kỹ năng sống',
        title: '[Review] Tuổi Trẻ Đáng Giá Bao Nhiêu? - Rosie Nguyễn',
        content: `
            <p>Đây không phải là một cuốn sách giáo điều khuyên bạn phải làm thế này, thế kia mới thành công. "Tuổi trẻ đáng giá bao nhiêu" giống như những lời tâm sự chân thành từ một người chị đi trước, chia sẻ lại những vấp ngã và bài học chị đã trải qua trong những năm tháng thanh xuân rực rỡ nhất.</p>
            <p>Sách chia làm 4 phần chính xoay quanh các chủ đề: HỌC, LÀM, ĐI và ĐỌC. Rosie Nguyễn đã phá vỡ lối mòn tư duy về việc học đại học chỉ để lấy bằng. Chị khuyến khích các bạn trẻ hãy mạnh dạn trải nghiệm, đọc sách nhiều hơn, xách balo lên và đi để mở rộng thế giới quan.</p>
            <blockquote>"Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ. Bạn trải qua những ngày tháng nhạt nhẽo với công việc mình căm ghét, người ta chẳng hề bận lòng."</blockquote>
            <p>Sau khi gấp cuốn sách lại, mình cảm thấy được tiếp thêm một nguồn năng lượng khổng lồ để bắt tay vào thực hiện những kế hoạch còn đang dang dở. Rất đáng để các bạn sinh viên và người trẻ đọc và suy ngẫm!</p>
        `
    },
    'review3': {
        img: 'img/sach3.jpg',
        meta: '<i class="fas fa-pen-nib"></i> Review bởi Hoàng Nam | Chữa lành',
        title: '[Review] Yêu Những Điều Không Hoàn Hảo - Hae Min',
        content: `
            <p>Chúng ta luôn bị áp lực bởi việc phải trở nên xuất sắc, phải đạt điểm cao, phải làm hài lòng tất cả mọi người. Nhưng rồi, Đại sư Hae Min đến và nhẹ nhàng nhắc nhở: "Không sao đâu nếu bạn không hoàn hảo, vì chính sự không hoàn hảo đó mới làm nên con người bạn."</p>
            <p>Cuốn sách là tập hợp những bài tản văn ngắn, kèm theo những câu quote đầy ý nghĩa và hình minh họa siêu dễ thương. Bạn không cần phải đọc từ đầu đến cuối, chỉ cần mở ngẫu nhiên một trang vào mỗi buổi sáng, bạn sẽ nhận được một thông điệp tích cực cho cả ngày.</p>
            <blockquote>"Đừng quá khắt khe với chính mình. Hãy đối xử với bản thân như cách bạn đối xử với người mà bạn yêu thương nhất."</blockquote>
            <p>Cuốn sách giúp mình nhận ra việc chấp nhận khuyết điểm của bản thân và tha thứ cho lỗi lầm của người khác là chìa khóa để giải thoát khỏi những muộn phiền. Một liều thuốc tinh thần thực sự dịu êm cho những ngày giông bão.</p>
        `
    }
};

function openArticleModal(articleId) {
    const data = articlesData[articleId];
    if (data) {
       
        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalMeta').innerHTML = data.meta;
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalContent').innerHTML = data.content;
        document.getElementById('articleModalOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeArticleModal() {
    document.getElementById('articleModalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}
document.getElementById('articleModalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeArticleModal();
    }
});