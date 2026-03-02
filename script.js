document.addEventListener('DOMContentLoaded', function() {
    // ========== ИСПРАВЛЕНИЕ ОТОБРАЖЕНИЯ ФОТО ==========
    function fixPhotoDisplay() {
        const heroPhoto = document.querySelector('.hero-photo');
        const heroWrapper = document.querySelector('.hero-photo-wrapper');
        
        if (!heroPhoto || !heroWrapper) return;
        
        function adjustPhoto() {
            // Убираем возможные артефакты
            heroWrapper.style.lineHeight = '0';
            heroWrapper.style.fontSize = '0';
            heroWrapper.style.overflow = 'hidden';
            
            heroPhoto.style.margin = '0';
            heroPhoto.style.padding = '0';
            heroPhoto.style.display = 'block';
            heroPhoto.style.width = '100%';
            heroPhoto.style.height = 'auto';
            
            // Логируем для отладки (можно удалить после проверки)
            if (heroPhoto.complete) {
                console.log('Фото загружено:', heroPhoto.naturalWidth, 'x', heroPhoto.naturalHeight);
            }
        }
        
        if (heroPhoto.complete) {
            adjustPhoto();
        } else {
            heroPhoto.onload = adjustPhoto;
        }
        
        // Перестраховка при изменении размера окна
        window.addEventListener('resize', function() {
            setTimeout(adjustPhoto, 100);
        });
    }
    
    // ========== СЛАЙДЕР ПОЖЕЛАНИЙ ==========
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevWish');
    const nextBtn = document.getElementById('nextWish');
    
    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        
        function updateSlider(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;
            
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentSlide = index;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                updateSlider(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                updateSlider(currentSlide + 1);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                updateSlider(index);
            });
        });
    }
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ =====
    const faders = document.querySelectorAll('.fade-in');
    
    const appearObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.2, // Элемент появляется, когда видно 20%
      rootMargin: "0px 0px -50px 0px" // Небольшая задержка
    });
    
    faders.forEach(fader => appearObserver.observe(fader));    
    
    // ========== ГЕНЕРАЦИЯ КАЛЕНДАРЯ ==========
    const calendarGrid = document.getElementById('calendarGrid');
    
    if (calendarGrid) {
        function generateCalendar() {
            const daysInMonth = 31;
            const firstDayOfWeek = 2; // 1 июля 2026 - среда
            
            calendarGrid.innerHTML = '';
            
            for (let i = 0; i < firstDayOfWeek; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                emptyDay.style.visibility = 'hidden';
                calendarGrid.appendChild(emptyDay);
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                if (day === 17) {
                    dayElement.classList.add('highlight');
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }
        
        generateCalendar();
    }
    
    // ========== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ==========
    const weddingDate = new Date('2026-07-17T16:00:00').getTime();
    
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');
    
    if (timerDays && timerHours && timerMinutes && timerSeconds) {
        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            timerDays.textContent = days < 10 ? '0' + days : days;
            timerHours.textContent = hours < 10 ? '0' + hours : hours;
            timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
            timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
            
            if (distance < 0) {
                clearInterval(timerInterval);
                timerDays.textContent = '00';
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }, 1000);
    }
    // ===== УЛУЧШЕННЫЙ СЛАЙДЕР ПОЖЕЛАНИЙ С СВАЙПАМИ =====
const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slider-slide');
const prevBtn = document.getElementById('prevWish');
const nextBtn = document.getElementById('nextWish');
const dots = document.querySelectorAll('.dot');

if (sliderTrack && slides.length > 0) {
    let currentSlide = 0;
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    function updateSlider(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        sliderTrack.style.transition = 'transform 0.5s ease';
        
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentSlide = index;
    }
    
    // Обработчики для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            updateSlider(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            updateSlider(currentSlide + 1);
        });
    }
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateSlider(index);
        });
    });
    
    // ===== ДОБАВЛЯЕМ ПОДДЕРЖКУ СВАЙПОВ =====
    
    // Для мобильных устройств (touch-события)
    sliderTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        sliderTrack.style.transition = 'none'; // Убираем анимацию во время свайпа
    }, { passive: true });
    
    sliderTrack.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        endX = e.touches[0].clientX;
        const diff = endX - startX;
        
        // Плавное смещение при свайпе
        const offset = -currentSlide * 100 + (diff / sliderTrack.offsetWidth) * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;
    }, { passive: true });
    
    sliderTrack.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = endX - startX;
        const threshold = 50; // Минимальное расстояние для свайпа
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Свайп вправо - предыдущий слайд
                updateSlider(currentSlide - 1);
            } else {
                // Свайп влево - следующий слайд
                updateSlider(currentSlide + 1);
            }
        } else {
            // Возвращаем на место, если свайп был слишком коротким
            updateSlider(currentSlide);
        }
        
        startX = 0;
        endX = 0;
    });
    
    // Для компьютеров (мышь с зажатой кнопкой)
    sliderTrack.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Предотвращаем выделение текста
        startX = e.clientX;
        isDragging = true;
        sliderTrack.style.transition = 'none';
        sliderTrack.style.cursor = 'grabbing';
    });
    
    sliderTrack.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        endX = e.clientX;
        const diff = endX - startX;
        
        const offset = -currentSlide * 100 + (diff / sliderTrack.offsetWidth) * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;
    });
    
    sliderTrack.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        isDragging = false;
        sliderTrack.style.cursor = 'grab';
        
        const diff = endX - startX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                updateSlider(currentSlide - 1);
            } else {
                updateSlider(currentSlide + 1);
            }
        } else {
            updateSlider(currentSlide);
        }
        
        startX = 0;
        endX = 0;
    });
    
    // Отмена свайпа, если мышь вышла за пределы слайдера
    sliderTrack.addEventListener('mouseleave', function() {
        if (isDragging) {
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
            updateSlider(currentSlide); // Возвращаем на место
            startX = 0;
            endX = 0;
        }
    });
    
    // Устанавливаем курсор для десктопа
    sliderTrack.style.cursor = 'grab';
    
    // Инициализация
    updateSlider(0);
}
    // ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right, .fade-in-left');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                // Элементы уже имеют классы анимации
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    setTimeout(checkScroll, 100);
    
    // ========== УПРАВЛЕНИЕ МУЗЫКОЙ ==========
    const audio = document.getElementById('wedding-audio');
    const musicControl = document.getElementById('musicControl');
    let isMusicInitialized = false;
    let isMuted = false;
    
    if (audio) {
        audio.volume = 0.2;
    }
    
    function tryPlayMusic() {
        if (!audio || isMusicInitialized) return;
        
        audio.play()
            .then(() => {
                console.log('Музыка играет');
                isMusicInitialized = true;
                musicControl.classList.add('visible');
                musicControl.classList.remove('muted');
            })
            .catch(error => {
                console.log('Автовоспроизведение заблокировано');
                musicControl.classList.add('visible');
                musicControl.classList.add('muted');
            });
    }
    
    function toggleMute() {
        if (!audio) return;
        
        if (isMuted) {
            audio.muted = false;
            audio.volume = 0.2;
            musicControl.classList.remove('muted');
            isMuted = false;
        } else {
            audio.muted = true;
            musicControl.classList.add('muted');
            isMuted = true;
        }
    }
    
    setTimeout(() => {
        tryPlayMusic();
    }, 1000);
    
    if (musicControl) {
        musicControl.addEventListener('click', toggleMute);
    }
    
    document.addEventListener('click', function tryPlayOnAnyClick() {
        if (!isMusicInitialized && audio) {
            tryPlayMusic();
            document.removeEventListener('click', tryPlayOnAnyClick);
        }
    });
    
    document.addEventListener('touchstart', function tryPlayOnTouch() {
        if (!isMusicInitialized && audio) {
            tryPlayMusic();
            document.removeEventListener('touchstart', tryPlayOnTouch);
        }
    });
    
    // Запускаем исправление фото
    fixPhotoDisplay();
});

// Дополнительная проверка после полной загрузки страницы
window.addEventListener('load', function() {
    const heroPhoto = document.querySelector('.hero-photo');
    if (heroPhoto) {
        console.log('Страница полностью загружена');
    }
});
