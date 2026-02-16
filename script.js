document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const clickArea = document.getElementById('clickArea');
    const openButton = document.getElementById('openButton');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('envelopeOverlay');
    
    let isOpened = false;
    
    function openEnvelope() {
        if (isOpened) return;
        isOpened = true;
        
        envelope.classList.add('open');
        
        setTimeout(function() {
            envelope.classList.add('hidden');
            mainContent.classList.add('visible');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            }
        }, 800);
    }
    
    // Открытие по клику на любую область
    clickArea.addEventListener('click', openEnvelope);
    
    // Также можно кликнуть на текст (для удобства)
    openButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Чтобы не сработало дважды
        openEnvelope();
    });
    
    // Автоматическое открытие через 5 секунд
    setTimeout(openEnvelope, 5000);
});
