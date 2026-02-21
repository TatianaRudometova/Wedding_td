document.addEventListener('DOMContentLoaded', function() {
    // ========== ОТКРЫВАНИЕ КОНВЕРТА ==========
    const envelope = document.getElementById('envelope');
    const clickArea = document.getElementById('clickArea');
    const openButton = document.getElementById('openButton');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('envelopeOverlay');
    
    let isOpened = false;
    
    // Функция открытия конверта
    function openEnvelope() {
        if (isOpened) return;
        isOpened = true;
        
        envelope.classList.add('open'); // Запускаем анимацию открытия
        
        // Через 0.8с скрываем конверт и показываем основной контент
        setTimeout(function() {
            envelope.classList.add('hidden'); // Прячем конверт
            mainContent.classList.add('visible'); // Показываем основной контент
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            }
        }, 800);
    }
    
    // Открытие по клику на область
    if (clickArea) {
        clickArea.addEventListener('click', openEnvelope);
    }
    
    // Открытие по клику на кнопку
    if (openButton) {
        openButton.addEventListener('click', function(e) {
            e.stopPropagation();
            openEnvelope();
        });
    }
    
    // Автоматическое открытие через 5 секунд (демо-режим)
    setTimeout(openEnvelope, 5000);
    
    // ========== СЛАЙДЕР ПОЖЕЛАНИЙ ==========
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevWish');
    const nextBtn = document.getElementById('nextWish');
    
    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        
        // Функция обновления слайдера
        function updateSlider(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;
            
            // Обновляем активный класс для слайдов
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            // Обновляем точки
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentSlide = index;
        }
        
        // Кнопка "назад"
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                updateSlider(currentSlide - 1);
            });
        }
        
        // Кнопка "вперед"
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                updateSlider(currentSlide + 1);
            });
        }
        
        // Клик по точкам
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
            const firstDayOfWeek = 2; // 0 - Пн, 1 - Вт, 2 - Ср, ... (1 июля 2026 - среда)
            
            // Очищаем календарь
            calendarGrid.innerHTML = '';
            
            // Создаем пустые ячейки для первых дней месяца
            for (let i = 0; i < firstDayOfWeek; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                emptyDay.style.visibility = 'hidden';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Создаем ячейки для дней месяца
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                // Подсвечиваем 17 число
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
            
            // Расчет времени
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Обновление с ведущими нулями
            timerDays.textContent = days < 10 ? '0' + days : days;
            timerHours.textContent = hours < 10 ? '0' + hours : hours;
            timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
            timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
            
            // Если дата прошла
            if (distance < 0) {
                clearInterval(timerInterval);
                timerDays.textContent = '00';
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }, 1000);
    }
    
    // ========== FAQ АККОРДЕОН (если используется) ==========
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
            } else {
                answer.classList.add('show');
            }
        });
    });
});
