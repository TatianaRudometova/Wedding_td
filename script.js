// Отключаем восстановление позиции скролла браузером
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Принудительная прокрутка вверх при загрузке
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
    // ===== ПРОКРУТКА НАВЕРХ ПРИ ЗАГРУЗКЕ =====
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });    
    
// ========== ГЕНЕРАЦИЯ КАЛЕНДАРЯ ==========
const calendarGrid = document.getElementById('calendarGrid');

if (calendarGrid) {
    console.log('Генерируем календарь с heart.png для 17 июля');
    
    function generateCalendar() {
        const daysInMonth = 31;
        const firstDayOfWeek = 2; // 1 июля 2026 - среда
        const weddingDay = 17;
        
        calendarGrid.innerHTML = '';
        
        // Пустые ячейки для дней до 1 июля
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            emptyDay.style.visibility = 'hidden';
            emptyDay.style.pointerEvents = 'none';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            if (day === weddingDay) {
                dayElement.classList.add('heart');
                
                // Проверяем, загрузилась ли картинка
                const img = new Image();
                img.onload = function() {
                    console.log('heart.png загружен успешно');
                    dayElement.classList.remove('fallback');
                };
                img.onerror = function() {
                    console.log('Ошибка загрузки heart.png, используем запасной фон');
                    dayElement.classList.add('fallback');
                };
                img.src = 'images/heart.png';
                
                // Атрибуты доступности
                dayElement.setAttribute('aria-label', '17 июля - день нашей свадьбы ❤️');
                dayElement.setAttribute('title', 'Наш особенный день! ❤️');
            }
            
            calendarGrid.appendChild(dayElement);
        }
        
        console.log('Календарь сгенерирован, под цифрой 17 фон heart.png');
    }
    
    generateCalendar();
}
    
    // ========== ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ==========
    const timerDays = document.getElementById('timerDays');
    const timerHours = document.getElementById('timerHours');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerSeconds = document.getElementById('timerSeconds');
    
    if (timerDays && timerHours && timerMinutes && timerSeconds) {
        console.log('Запускаем таймер');
        
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
        }
        
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
        
        window.addEventListener('beforeunload', function() {
            clearInterval(timerInterval);
        });
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
        console.log('Запускаем слайдер');
        
        let currentSlide = 0;
        
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
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            sliderTrack.style.transition = 'none';
        }, { passive: true });
        
        sliderTrack.addEventListener('touchmove', function(e) {
            e.preventDefault();
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            
            const maxOffset = 50;
            const limitedDiff = Math.max(Math.min(diff, maxOffset), -maxOffset);
            
            const offset = -currentSlide * 100 + (limitedDiff / sliderTrack.offsetWidth) * 100;
            sliderTrack.style.transform = `translateX(${offset}%)`;
        }, { passive: false });
        
        sliderTrack.addEventListener('touchend', function(e) {
            sliderTrack.style.transition = 'transform 0.3s ease';
            
            const diff = touchEndX - touchStartX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentSlide > 0) {
                    updateSlider(currentSlide - 1);
                } else if (diff < 0 && currentSlide < slides.length - 1) {
                    updateSlider(currentSlide + 1);
                } else {
                    updateSlider(currentSlide);
                }
            } else {
                updateSlider(currentSlide);
            }
            
            touchStartX = 0;
            touchEndX = 0;
        });
        
        sliderTrack.style.cursor = 'grab';
        updateSlider(0);
    }
    
    // ===== ОТПРАВКА ФОРМЫ ЧЕРЕЗ FETCH =====
    const rsvpForm = document.querySelector('.rsvp-form');
    const otherDrinkCheckbox = document.getElementById('otherDrinkCheckbox');
    const otherDrinkContainer = document.getElementById('otherDrinkContainer');
    
    // Показ/скрытие поля "Другое"
    if (otherDrinkCheckbox && otherDrinkContainer) {
        otherDrinkCheckbox.addEventListener('change', function() {
            otherDrinkContainer.style.display = this.checked ? 'block' : 'none';
            if (!this.checked) {
                const otherInput = otherDrinkContainer.querySelector('input');
                if (otherInput) otherInput.value = '';
            }
        });
    }
    
    // Отправка формы через fetch
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Спасибо! Ваша анкета отправлена.');
                    this.reset();
                    
                    if (otherDrinkContainer) {
                        otherDrinkContainer.style.display = 'none';
                        if (otherDrinkCheckbox) otherDrinkCheckbox.checked = false;
                    }
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert('Ошибка: ' + data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
                    }
                }
            } catch (error) {
                alert('Ошибка соединения. Проверьте интернет и попробуйте снова.');
                console.error('Error:', error);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
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
    
    // Еще раз прокручиваем вверх после полной загрузки
    window.scrollTo(0, 0);
});
