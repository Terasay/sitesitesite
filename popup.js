document.addEventListener('DOMContentLoaded', function () {
    const socials = document.querySelectorAll('.footer-socials a');
    let popup = null;

    function createPopup(network) {
        if (popup) popup.remove();
        popup = document.createElement('div');
        popup.className = 'popup-social';
        let title = '';
        let content = '';
        if (network === 'Instagram') {
            title = 'Instagram';
            content = `<a href="https://www.instagram.com/limon_origin/" target="_blank" rel="noopener" class="btn popup-link">Перейти в Instagram</a>`;
        } else if (network === 'Telegram') {
            title = 'Telegram';
            content = `<a href="https://t.me/Terasayka" target="_blank" rel="noopener" class="btn popup-link">Открыть Telegram</a>`;
        } else if (network === 'VK') {
            title = 'VK';
            content = `<a href="https://vk.com/terridian" target="_blank" rel="noopener" class="btn popup-link">Перейти во VK</a>`;
        } else {
            title = network;
            content = '';
        }
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close">&times;</span>
                <h3>${title}</h3>
                <div style="margin-bottom:18px">${content}</div>
                <button class="btn popup-btn">Закрыть</button>
            </div>
        `;
        document.body.appendChild(popup);
        popup.querySelector('.popup-close').onclick = closePopup;
        popup.querySelector('.popup-btn').onclick = closePopup;
        popup.addEventListener('click', function(e) {
            if (e.target === popup) closePopup();
        });
    }
    function closePopup() {
        if (popup) {
            popup.remove();
            popup = null;
        }
    }
    socials.forEach(link => {
        link.addEventListener('click', function(e) {
            const network = link.title || link.getAttribute('title') || 'Соцсеть';
            let url = '';
            let winName = '';
            if (network === 'Telegram') {
                url = 'https://t.me/Terasayka';
                winName = 'tg_popup';
            } else if (network === 'Instagram') {
                url = 'https://www.instagram.com/limon_origin/';
                winName = 'insta_popup';
            } else if (network === 'VK') {
                url = 'https://vk.com/terridian';
                winName = 'vk_popup';
            }
            if (url) {
                e.preventDefault();
                window.open(
                    url,
                    winName,
                    'width=480,height=700,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes'
                );
                return;
            }
            e.preventDefault();
            createPopup(network);
        });
    });
});
