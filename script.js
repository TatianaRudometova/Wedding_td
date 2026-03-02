document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ГЕНЕРАЦИЯ КАЛЕНДАРЯ (В САМОМ НАЧАЛЕ) ==========
    const calendarGrid = document.getElementById('calendarGrid');
    
    if (calendarGrid) {
        console.log('Генерируем календарь'); // Для отладки
        
        function generateCalendar() {
            const daysInMonth = 31;
            const firstDayOfWeek = 2; // 1 июля 2026 - среда
            
            calendarGrid.innerHTML = '';
            
            // Добавляем пустые ячейки для дней до 1 июля
            for (let i = 0; i < firstDayOfWeek; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                emptyDay.style.visibility = 'hidden';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Добавляем дни месяца
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
    } else {
        console.log('Календарь не найден'); // Для отладки
    }
    
    // ========== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ==========
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');
    
    if (timerDays && timerHours && timerMinutes && timerSeconds) {
        console.log('Запускаем таймер'); // Для отладки
        
        const weddingDate = new Date('2026-07-17T16:00:00').getTime();
        
        function updateTimer() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            let days, hours, minutes, seconds;
            
            if (distance < 0) {
                days = hours = minutes = seconds = 0;
            } else {
                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
            }
            
            timerDays.textContent = days < 10 ? '0' + days : days;
            timerHours.textContent = hours < 10 ? '0' + hours : hours;
            timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
            timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
            
            console.log('Таймер обновлен:', days, hours, minutes, seconds); // Для отладки
        }
        
        // Запускаем сразу
        updateTimer();
        
        // Запускаем интервал
        const timerInterval = setInterval(updateTimer, 1000);
        
        // Очищаем интервал при уходе со страницы (для производительности)
        window.addEventListener('beforeunload', function() {
            clearInterval(timerInterval);
        });
    } else {
        console.log('Таймер не найден'); // Для отладки
    }
    
    // ========== ИСПРАВЛЕНИЕ ОТОБРАЖЕНИЯ ФОТО ==========
    function fixPhotoDisplay() {
        const heroPhoto = document.querySelector('.hero-photo');
        const heroWrapper = document.querySelector('.hero-photo-wrapper');
        
        if (!heroPhoto || !heroWrapper) return;
        
        function adjustPhoto() {
            heroWrapper.style.lineHeight = '0';
            heroWrapper.style.fontSize = '0';
            heroWrapper.style.overflow = 'hidden';
            
            heroPhoto.style.margin = '0';
            heroPhoto.style.padding = '0';
            heroPhoto.style.display = 'block';
            heroPhoto.style.width = '100%';
            heroPhoto.style.height = 'auto';
        }
        
        if (heroPhoto.complete) {
            adjustPhoto();
        } else {
            heroPhoto.onload = adjustPhoto;
        }
        
        window.addEventListener('resize', function() {
            setTimeout(adjustPhoto, 100);
        });
    }
    
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ =====
    const faders = document.querySelectorAll('.fade-in');
    
    if (faders.length > 0) {
        const appearObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        });
        
        faders.forEach(fader => appearObserver.observe(fader));
    }
    
    // ========== СЛАЙДЕР ПОЖЕЛАНИЙ С СВАЙПАМИ ==========
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.getElementById('prevWish');
    const nextBtn = document.getElementById('nextWish');
    const dots = document.querySelectorAll('.dot');
    
    if (sliderTrack && slides.length > 0) {
        console.log('Запускаем слайдер'); // Для отладки
        
        let currentSlide = 0;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        function updateSlider(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;
            sliderTrack.style.transition = 'transform 0.3s ease';
            
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
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                updateSlider(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                updateSlider(currentSlide + 1);
            });
        }
        
        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                updateSlider(index);
            });
        });
          // ===== ОБРАБОТКА ПОЛЯ "ДРУГОЕ" В АНКЕТЕ =====
        const otherDrinkCheckbox = document.getElementById('otherDrinkCheckbox');
        const otherDrinkContainer = document.getElementById('otherDrinkContainer');
        
        if (otherDrinkCheckbox && otherDrinkContainer) {
            otherDrinkCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    otherDrinkContainer.style.display = 'block';
                } else {
                    otherDrinkContainer.style.display = 'none';
                    // Очищаем поле, если чекбокс снят
                    const otherInput = otherDrinkContainer.querySelector('input');
                    if (otherInput) otherInput.value = '';
                }
            });
        }
        
        // ===== ОБРАБОТКА ОТПРАВКИ ФОРМЫ =====
        const rsvpForm = document.querySelector('.rsvp-form');
        if (rsvpForm) {
            rsvpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Собираем данные формы
                const formData = new FormData(this);
                let drinks = [];
                
                for (let pair of formData.entries()) {
                    if (pair[0] === 'drinks[]') {
                        drinks.push(pair[1]);
                    }
                }
                
                // Формируем сообщение для отладки (можно заменить на отправку)
                console.log('Данные формы:');
                console.log('Имя:', formData.get('name'));
                console.log('Присутствие:', formData.get('attendance'));
                console.log('Напитки:', drinks.join(', '));
                console.log('Другой напиток:', formData.get('other_drink'));
                console.log('Комментарий:', formData.get('comment'));
                
                // Здесь можно отправить данные через FormSpree
                // this.submit(); // Раскомментировать для реальной отправки
                
                alert('Спасибо за подтверждение! Мы свяжемся с вами позже.');
                this.reset();
                
                // Скрываем поле "Другое" после сброса формы
                if (otherDrinkContainer) {
                    otherDrinkContainer.style.display = 'none';
                }
            });
        }      
        // ===== ПОДДЕРЖКА СВАЙПОВ =====
        sliderTrack.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            sliderTrack.style.transition = 'none';
        }, { passive: true });
        
        sliderTrack.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const maxOffset = 50;
            const limitedDiff = Math.max(Math.min(diff, maxOffset), -maxOffset);
            
            const offset = -currentSlide * 100 + (limitedDiff / sliderTrack.offsetWidth) * 100;
            sliderTrack.style.transform = `translateX(${offset}%)`;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = currentX - startX;
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
            currentX = 0;
        });
        
        sliderTrack.style.cursor = 'grab';
        updateSlider(0);
    }
    
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

// Дополнительная проверка после полной загрузки
window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
    
    // Принудительно обновляем календарь на всякий случай
    const calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid && calendarGrid.children.length === 0) {
        console.log('Перегенерируем календарь');
        // Здесь можно вызвать генерацию снова, но лучше проверить почему не сработало
    }
});
