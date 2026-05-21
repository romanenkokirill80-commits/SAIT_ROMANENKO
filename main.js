// База данных достопримечательностей Благовещенска
const placesDatabase = [
    { 
        id: 1, 
        name: "Триумфальная арка", 
        status: "verified", 
        coords: "50.2900° N, 127.5267° E", 
        desc: "Символ города, построенная в честь цесаревича Николая.", 
        fullDesc: "Триумфальная арка была построена в 1891 году в честь прибытия цесаревича Николая (будущего императора Николая II). Восстановлена в 2005 году. Расположена на набережной Амура. Вход свободный, круглосуточно.",
        image: "img/arka.jpg"
    },
    { 
        id: 2, 
        name: "Набережная Амура", 
        status: "verified", 
        coords: "50.2885° N, 127.5330° E", 
        desc: "Главная прогулочная зона с видом на китайский Хэйхэ.", 
        fullDesc: "Протяжённость набережной - около 2 км. Отсюда открывается прекрасный вид на реку Амур и город Хэйхэ (Китай). Любимое место отдыха горожан и туристов. Есть лавочки, кафе, велодорожки.",
        image: "img/naberezhnaya.jpg"
    },
    { 
        id: 3, 
        name: "Кафедральный собор", 
        status: "restricted", 
        coords: "50.2850° N, 127.5150° E", 
        desc: "Благовещенский собор — главный храм города.", 
        fullDesc: "Построен в 2002 году на месте разрушенного храма. Работает ежедневно с 8:00 до 19:00. Вход свободный, но требуется соблюдать дресс-код.",
        image: "img/sobor.jpg"
    },
    { 
        id: 4, 
        name: "Краеведческий музей", 
        status: "verified", 
        coords: "50.2892° N, 127.5298° E", 
        desc: "Один из старейших музеев Дальнего Востока.", 
        fullDesc: "Основан в 1891 году. Богатейшая коллекция экспонатов по истории и культуре Приамурья. Часы работы: вт-вс 10:00-18:00. Цена билета: 300 руб.",
        image: "img/museum.jpg"
    },
    { 
        id: 5, 
        name: "Парк Дружбы", 
        status: "verified", 
        coords: "50.2823° N, 127.5312° E", 
        desc: "Парк на границе России и Китая.", 
        fullDesc: "Уникальный парк, расположенный прямо на границе двух государств. Символ дружбы между Россией и Китаем. Открыт круглосуточно, вход свободный.",
        image: "img/park.jpg"
    },
    { 
        id: 6, 
        name: "Памятник Муравьёву-Амурскому", 
        status: "verified", 
        coords: "50.2905° N, 127.5260° E", 
        desc: "Памятник основателю города.", 
        fullDesc: "Бронзовый памятник графу Муравьёву-Амурскому, основавшему город в 1856 году. Открыт в 1993 году. Находится у Триумфальной арки.",
        image: "img/monument.jpg"
    },
    { 
        id: 7, 
        name: "Гостиный двор", 
        status: "archive", 
        coords: "50.2868° N, 127.5239° E", 
        desc: "Старое купеческое здание.", 
        fullDesc: "Историческое здание XIX века. В настоящее время на реставрации. Доступ ограничен.",
        image: "img/gostiny.jpg"
    },
    { 
        id: 8, 
        name: "Первореченское", 
        status: "verified", 
        coords: "50.2583° N, 127.6567° E", 
        desc: "Живописное озеро в черте города.", 
        fullDesc: "Озеро в пойме реки Зея. Любимое место для прогулок и пикников. Есть пляж и лодочная станция.",
        image: "img/lake.jpg"
    },
    { 
        id: 9, 
        name: "Дом купца Плотникова", 
        status: "restricted", 
        coords: "50.2875° N, 127.5214° E", 
        desc: "Памятник деревянного зодчества.", 
        fullDesc: "Купеческий особняк конца XIX века. Экскурсии по предварительной записи. Доступен для посещения в субботу с 14:00 до 17:00.",
        image: "img/house.jpg"
    }
];

// Глобальные переменные
let displayedCount = 6;
let currentFilter = "all";
let currentSearch = "";

// Инициализация навигации (бургер-меню)
function initNav() {
    const toggleBtn = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    
    if (toggleBtn && navList) {
        toggleBtn.addEventListener('click', () => {
            navList.classList.toggle('nav__list--open');
        });
    }
}

// Валидация регистрации
function initRegistration() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agree = document.getElementById('agree').checked;
        const errorDiv = document.getElementById('formError');
        
        errorDiv.textContent = '';
        document.querySelectorAll('.form__input').forEach(input => {
            input.classList.remove('form__input--error');
        });
        
        let hasError = false;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email').classList.add('form__input--error');
            errorDiv.textContent = 'Ошибка: Неверный формат email';
            hasError = true;
        }
        
        if (password.length < 8) {
            document.getElementById('password').classList.add('form__input--error');
            errorDiv.textContent = 'Ошибка: Пароль должен содержать минимум 8 символов';
            hasError = true;
        }
        
        if (password !== confirmPassword) {
            document.getElementById('confirmPassword').classList.add('form__input--error');
            errorDiv.textContent = 'Ошибка: Пароли не совпадают';
            hasError = true;
        }
        
        if (!agree) {
            errorDiv.textContent = 'Ошибка: Необходимо согласие с условиями';
            hasError = true;
        }
        
        if (!hasError) {
            const userData = {
                username: username,
                email: email,
                fullname: '',
                avatar: null,
                history: []
            };
            localStorage.setItem('blagoveshenskGuideUser', JSON.stringify(userData));
            window.location.href = 'account.html';
        }
    });
}

// Личный кабинет
function initAccount() {
    const userData = localStorage.getItem('blagoveshenskGuideUser');
    
    if (!userData) {
        window.location.href = 'registration.html';
        return;
    }
    
    const user = JSON.parse(userData);
    
    const nameSpan = document.getElementById('accountName');
    const usernameInput = document.getElementById('profileUsername');
    const emailInput = document.getElementById('profileEmail');
    const fullnameInput = document.getElementById('profileFullname');
    
    if (nameSpan) nameSpan.textContent = user.username || 'Путешественник';
    if (usernameInput) usernameInput.value = user.username || '';
    if (emailInput) emailInput.value = user.email || '';
    if (fullnameInput) fullnameInput.value = user.fullname || '';
    
    if (user.avatar) {
        const avatarPreview = document.getElementById('avatarPreview');
        if (avatarPreview) {
            avatarPreview.innerHTML = `<img src="${user.avatar}" alt="Аватар">`;
        }
    }
    
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarUpload = document.getElementById('avatarUpload');
    
    if (changeAvatarBtn && avatarUpload) {
        changeAvatarBtn.addEventListener('click', () => {
            avatarUpload.click();
        });
        
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const avatarPreview = document.getElementById('avatarPreview');
                    if (avatarPreview) {
                        avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Аватар">`;
                    }
                    user.avatar = event.target.result;
                    localStorage.setItem('blagoveshenskGuideUser', JSON.stringify(user));
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (usernameInput) user.username = usernameInput.value;
            if (emailInput) user.email = emailInput.value;
            if (fullnameInput) user.fullname = fullnameInput.value;
            localStorage.setItem('blagoveshenskGuideUser', JSON.stringify(user));
            if (nameSpan) nameSpan.textContent = user.username;
            alert('Данные сохранены');
        });
    }
    
    const historyList = document.getElementById('historyList');
    if (historyList) {
        if (user.history && user.history.length > 0) {
            historyList.innerHTML = user.history.map(item => `
                <div class="history__item">
                    <span class="history__item-name">${item.name}</span>
                    <span class="history__item-date">${item.date}</span>
                </div>
            `).join('');
        } else {
            historyList.innerHTML = '<div class="history__empty">Нет просмотренных мест</div>';
        }
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('blagoveshenskGuideUser');
            window.location.href = 'index.html';
        });
    }
}

function addToHistory(placeName) {
    const userData = localStorage.getItem('blagoveshenskGuideUser');
    if (userData) {
        const user = JSON.parse(userData);
        if (!user.history) user.history = [];
        user.history.unshift({
            name: placeName,
            date: new Date().toLocaleDateString('ru-RU')
        });
        if (user.history.length > 10) user.history.pop();
        localStorage.setItem('blagoveshenskGuideUser', JSON.stringify(user));
    }
}

function createCard(place) {
    const statusClass = {
        'verified': 'card__tag--verified',
        'restricted': 'card__tag--restricted',
        'archive': 'card__tag--archive'
    }[place.status] || 'card__tag--verified';
    
    const statusText = {
        'verified': 'ОТКРЫТО',
        'restricted': 'ПО РАСПИСАНИЮ',
        'archive': 'АРХИВ'
    }[place.status] || 'ОТКРЫТО';
    
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.status = place.status;
    card.dataset.name = place.name.toLowerCase();
    card.innerHTML = `
        <img class="card__image" src="${place.image}" alt="${place.name}">
        <div class="card__tag ${statusClass}">${statusText}</div>
        <h3 class="card__title">${place.name}</h3>
        <div class="card__coords">${place.coords}</div>
        <p class="card__desc">${place.desc}</p>
        <button class="card__btn" data-id="${place.id}">ПОДРОБНЕЕ</button>
    `;
    
    const btn = card.querySelector('.card__btn');
    btn.addEventListener('click', () => {
        addToHistory(place.name);
        openModal(place);
    });
    
    return card;
}

function openModal(place) {
    const modal = document.getElementById('modal');
    const modalBody = modal.querySelector('.modal__body');
    
    const statusText = {
        'verified': 'ОТКРЫТО — ДОСТУП СВОБОДНЫЙ',
        'restricted': 'ПО РАСПИСАНИЮ — ТРЕБУЕТСЯ ПРОВЕРКА',
        'archive': 'АРХИВ — ОБЪЕКТ НА РЕСТАВРАЦИИ'
    }[place.status] || 'ОТКРЫТО — ДОСТУП СВОБОДНЫЙ';
    
    modalBody.innerHTML = `
        <h2>${place.name}</h2>
        <img src="${place.image}" alt="${place.name}" style="width:100%; margin:16px 0;">
        <p><strong>Координаты:</strong> ${place.coords}</p>
        <p><strong>Статус:</strong> ${statusText}</p>
        <p><strong>Подробное описание:</strong></p>
        <p style="line-height:1.6; margin-bottom:16px;">${place.fullDesc}</p>
        <p style="color: #00ff88;">Данные проверены</p>
        <p style="margin-top:16px;"><strong>Как добраться:</strong> Рекомендуется использовать городской транспорт или такси до указанных координат.</p>
    `;
    
    modal.classList.add('modal--open');
    
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.onclick = () => {
        modal.classList.remove('modal--open');
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('modal--open');
        }
    };
}

function filterAndSearch() {
    const cards = document.querySelectorAll('#catalogGrid .card');
    let visibleCount = 0;
    
    cards.forEach((card, index) => {
        const status = card.dataset.status;
        const name = card.dataset.name;
        
        let statusMatch = currentFilter === 'all' || status === currentFilter;
        let searchMatch = !currentSearch || name.includes(currentSearch.toLowerCase());
        
        if (statusMatch && searchMatch && index < displayedCount) {
            card.style.display = '';
            visibleCount++;
        } else if (statusMatch && searchMatch && index >= displayedCount) {
            card.style.display = 'none';
        } else {
            card.style.display = 'none';
        }
    });
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount < placesDatabase.length ? '' : 'none';
    }
}

function initCatalog() {
    const catalogGrid = document.getElementById('catalogGrid');
    if (!catalogGrid) return;
    
    placesDatabase.forEach(place => {
        catalogGrid.appendChild(createCard(place));
    });
    
    displayedCount = 6;
    currentFilter = 'all';
    currentSearch = '';
    filterAndSearch();
    
    const filterBtns = document.querySelectorAll('.filters__btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('filters__btn--active'));
            btn.classList.add('filters__btn--active');
            currentFilter = btn.dataset.filter;
            displayedCount = 6;
            filterAndSearch();
        });
    });
    
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            currentSearch = searchInput.value;
            displayedCount = 6;
            filterAndSearch();
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentSearch = searchInput.value;
                displayedCount = 6;
                filterAndSearch();
            }
        });
    }
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const totalCards = document.querySelectorAll('#catalogGrid .card').length;
            displayedCount = Math.min(displayedCount + 3, totalCards);
            filterAndSearch();
        });
    }
}

function initModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.remove('modal--open');
            };
        }
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('modal--open');
            }
        };
    }
}

function initIndexCards() {
    const previewCards = document.querySelectorAll('.preview .card__btn');
    previewCards.forEach((btn, index) => {
        const place = placesDatabase[index];
        if (place) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => {
                addToHistory(place.name);
                openModal(place);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initModal();
    
    const page = document.body.dataset.page;
    
    if (page === 'registration') {
        initRegistration();
    } else if (page === 'account') {
        initAccount();
    } else if (page === 'places') {
        initCatalog();
    } else if (page === 'index') {
        initIndexCards();
    }
});