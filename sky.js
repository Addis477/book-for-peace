// Sky Canvas Animation
let currentTimeOfDay = 'afternoon';

document.addEventListener('DOMContentLoaded', function() {
    updateTimeOfDay();
    applySkyToElements();
    startSkyTimer();
    createStars();
});

function updateTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 7) currentTimeOfDay = 'dawn';
    else if (hour >= 7 && hour < 11) currentTimeOfDay = 'morning';
    else if (hour >= 11 && hour < 16) currentTimeOfDay = 'afternoon';
    else if (hour >= 16 && hour < 18) currentTimeOfDay = 'evening';
    else if (hour >= 18 && hour < 20) currentTimeOfDay = 'sunset';
    else currentTimeOfDay = 'night';
}

function applySkyToElements() {
    const elements = document.querySelectorAll('.hero-sky, .sky-mini, .sky-canvas');
    const gradients = {
        dawn: 'linear-gradient(135deg, #87CEEB 0%, #FDB813 70%)',
        morning: 'linear-gradient(135deg, #3498DB 0%, #87CEEB 100%)',
        afternoon: 'linear-gradient(135deg, #1E4B7A 0%, #3498DB 100%)',
        evening: 'linear-gradient(135deg, #4B0082 0%, #9370DB 70%)',
        sunset: 'linear-gradient(135deg, #FF4500 0%, #FDB813 50%, #4B0082 100%)',
        night: 'linear-gradient(135deg, #0B1A2F 0%, #191970 100%)'
    };
    
    elements.forEach(el => {
        if (el) {
            el.style.background = gradients[currentTimeOfDay];
            if (currentTimeOfDay === 'night') {
                el.classList.add('has-stars');
            } else {
                el.classList.remove('has-stars');
            }
        }
    });
}

function startSkyTimer() {
    setInterval(() => {
        const old = currentTimeOfDay;
        updateTimeOfDay();
        if (old !== currentTimeOfDay) {
            applySkyToElements();
        }
    }, 60000);
}

function createStars() {
    const style = document.createElement('style');
    style.textContent = `
        .has-stars { position: relative; }
        .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle 2s infinite;
        }
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    setInterval(() => {
        document.querySelectorAll('.has-stars').forEach(sky => {
            const stars = sky.querySelectorAll('.star');
            if (stars.length < 30) {
                for (let i = stars.length; i < 30; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.cssText = `
                        width: ${Math.random()*3+1}px;
                        height: ${Math.random()*3+1}px;
                        top: ${Math.random()*100}%;
                        left: ${Math.random()*100}%;
                        opacity: ${Math.random()*0.8+0.2};
                        animation: twinkle ${Math.random()*3+2}s infinite;
                    `;
                    sky.appendChild(star);
                }
            }
        });
    }, 5000);
}
