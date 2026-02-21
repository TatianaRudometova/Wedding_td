document.addEventListener('DOMContentLoaded', function() {
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
    
    // ========== ГЕНЕРАЦИЯ КАЛЕНДАРЯ ==========
    const calendarGrid = document.getElementById('calendarGrid');
    
    if (calendarGrid) {
        function generateCalendar() {
            // Июль 2026: 1 июля 2026 - среда
            const daysInMonth = 31;
            const firstDayOfWeek = 2; // 0 - Пн, 1 - Вт, 2 - Ср
            
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
    
    // ========== УПРАВЛЕНИЕ МУЗЫКОЙ ==========
    const audio = document.getElementById('wedding-audio');
    const musicControl = document.getElementById('musicControl');
    let isMusicInitialized = false;
    let isMuted = false;
    
    // Устанавливаем низкую громкость по умолчанию (20%)
    if (audio) {
        audio.volume = 0.2;
    }
    
    // Функция попытки воспроизведения музыки
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
                console.log('Автовоспроизведение заблокировано, ждем взаимодействия');
                // Показываем кнопку, но в muted состоянии
                musicControl.classList.add('visible');
                musicControl.classList.add('muted');
            });
    }
    
    // Функция переключения звука
    function toggleMute() {
        if (!audio) return;
        
        if (isMuted) {
            // Включаем звук
            audio.muted = false;
            audio.volume = 0.2; // Возвращаем громкость
            musicControl.classList.remove('muted');
            isMuted = false;
        } else {
            // Выключаем звук
            audio.muted = true;
            musicControl.classList.add('muted');
            isMuted = true;
        }
    }
    
    // Пытаемся включить музыку после загрузки страницы
    setTimeout(() => {
        tryPlayMusic();
    }, 1000);
    
    // Обработчик клика по кнопке управления музыкой
    if (musicControl) {
        musicControl.addEventListener('click', toggleMute);
    }
    
    // Дополнительная попытка включить музыку при любом клике по сайту,
    // если она еще не играет
    document.addEventListener('click', function tryPlayOnAnyClick() {
        if (!isMusicInitialized && audio) {
            tryPlayMusic();
            // Удаляем обработчик после первой успешной попытки
            document.removeEventListener('click', tryPlayOnAnyClick);
        }
    });
    
    // Если пользователь взаимодействовал с сайтом
    document.addEventListener('touchstart', function tryPlayOnTouch() {
        if (!isMusicInitialized && audio) {
            tryPlayMusic();
            document.removeEventListener('touchstart', tryPlayOnTouch);
        }
    });
});
