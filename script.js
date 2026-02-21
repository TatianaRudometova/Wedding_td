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
    
    // ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right, .fade-in-left');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                // Элементы уже имеют классы анимации в HTML
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
});
