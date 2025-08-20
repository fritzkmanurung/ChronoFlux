// Create floating particles
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        document.body.appendChild(particle);
    }
}

// Clock functionality
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;
let alarmTime = null;
let alarmSet = false;

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateString = `${day}, ${month} ${date}, ${year}`;
    
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
    
    // Update seconds progress bar
    const secondsProgress = (now.getSeconds() / 60) * 100;
    document.getElementById('secondsFill').style.width = secondsProgress + '%';
    
    // Check alarm
    if (alarmSet && alarmTime) {
        const currentTime = `${hours}:${minutes}`;
        if (currentTime === alarmTime) {
            triggerAlarm();
        }
    }
}

// Control functions
function showClock() {
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('stopwatch').classList.remove('active');
    document.getElementById('alarmSection').classList.remove('active');
}

function toggleStopwatch() {
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('stopwatch').classList.add('active');
    document.getElementById('alarmSection').classList.remove('active');
}

function toggleAlarm() {
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('alarmSection').classList.add('active');
    document.getElementById('stopwatch').classList.remove('active');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Stopwatch functions
function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 10);
    }
}

function pauseStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const minutes = Math.floor(stopwatchTime / 6000);
    const seconds = Math.floor((stopwatchTime % 6000) / 100);
    const centiseconds = stopwatchTime % 100;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
    document.getElementById('stopwatchTime').textContent = timeString;
}

// Alarm functions
function setAlarm() {
    const timeInput = document.getElementById('alarmTime').value;
    if (timeInput) {
        alarmTime = timeInput;
        alarmSet = true;
        document.getElementById('alarmStatus').textContent = `Alarm set for ${timeInput}`;
    }
}

function clearAlarm() {
    alarmTime = null;
    alarmSet = false;
    document.getElementById('alarmTime').value = '';
    document.getElementById('alarmStatus').textContent = '';
}

function triggerAlarm() {
    alert('ALARM! Time to wake up!');
    clearAlarm();
}

function toggleTheme() {
    const toggle = document.querySelector('.theme-toggle');
    const before = toggle.querySelector('::before');
    toggle.style.transform = toggle.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
}

// Initialize
createParticles();
updateClock();
setInterval(updateClock, 1000);
updateStopwatchDisplay();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
    if (e.key === 's' || e.key === 'S') {
        toggleStopwatch();
    }
    if (e.key === 'a' || e.key === 'A') {
        toggleAlarm();
    }
});