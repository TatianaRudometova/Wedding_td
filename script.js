document.addEventListener('DOMContentLoaded', function() {
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
            
            if (heroPhoto.complete) {
                console.log('Фото загружено:', heroPhoto.naturalWidth, 'x', heroPhoto.naturalHeight);
            }
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
    
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (IntersectionObserver) =====
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
    
    // ========== УЛУЧШЕННЫЙ СЛАЙДЕР ПОЖЕЛАНИЙ С СВАЙПАМИ ==========
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.getElementById('prevWish');
    const nextBtn = document.getElementById('nextWish');
    const dots = document.querySelectorAll('.dot');
    
    if (sliderTrack && slides.length > 0) {
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
        
        // ===== ПОДДЕРЖКА СВАЙПОВ =====
        
        // Для мобильных устройств
        sliderTrack.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            sliderTrack.style.transition = 'none';
        }, { passive: true });
        
        sliderTrack.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            
            // Ограничиваем смещение
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
        
        // Для компьютеров (мышь)
        sliderTrack.addEventListener('mousedown', function(e) {
            e.preventDefault();
            startX = e.clientX;
            isDragging = true;
            sliderTrack.style.transition = 'none';
            sliderTrack.style.cursor = 'grabbing';
        });
        
        sliderTrack.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            currentX = e.clientX;
            const diff = currentX - startX;
            
            const maxOffset = 50;
            const limitedDiff = Math.max(Math.min(diff, maxOffset), -maxOffset);
            
            const offset = -currentSlide * 100 + (limitedDiff / sliderTrack.offsetWidth) * 100;
            sliderTrack.style.transform = `translateX(${offset}%)`;
        });
        
        sliderTrack.addEventListener('mouseup', function() {
            if (!isDragging) return;
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
            
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
        
        sliderTrack.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                sliderTrack.style.cursor = 'grab';
                updateSlider(currentSlide);
                startX = 0;
                currentX = 0;
            }
        });
        
        sliderTrack.style.cursor = 'grab';
        updateSlider(0);
    }
    
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
