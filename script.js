$(document).ready(function () {
    let timer;
    let count = 0;
    let isRunning = false;
    let timerDuration;

    function updateDisplay(minutes, seconds, milliseconds) {
        let hundredths = Math.floor(milliseconds / 10).toString().padStart(2, '0');
        $('#timer-display').text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundredths}`);
    }

    function startTimer(duration) {
        timerDuration = duration;
    let startTime = Date.now();
    isRunning = true;

    timer = setInterval(function () {
        let elapsedTime = Date.now() - startTime;
        let timeRemaining = timerDuration - elapsedTime;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            isRunning = false;
            updateDisplay(0, 0, 0);
            playSound(); // Call a function to handle sound playback
            return;
        }

            let minutes = parseInt(timeRemaining / 60000, 10);
            let seconds = parseInt((timeRemaining % 60000) / 1000, 10);
            let milliseconds = parseInt(timeRemaining % 1000, 10);

            updateDisplay(minutes, seconds, milliseconds);
        }, 100); // Update interval set to 1 millisecond
    }

    function playSound() {
        // Check if the sound is allowed to play
        if (typeof Audio !== "undefined") {
            var audio = new Audio('alarm.wav'); // Make sure the path is correct
            audio.play().catch(e => console.log('Audio playback failed: ' + e));
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    $('#start-pause-btn').click(function () {
        let minutes = parseInt($('#minutes').val()) || 0;
    let seconds = parseInt($('#seconds').val()) || 0;
    let totalMilliseconds = (minutes * 60 + seconds) * 1000;

    if (totalMilliseconds > 0) {
        if (!isRunning) {
            // Increment the counter only when the timer starts
            count++;
            $('#count-display').text(`Count: ${count}`);
            
            if (timerDuration === undefined || timerDuration <= 0) {
                timerDuration = totalMilliseconds;
            }
            startTimer(timerDuration);
        } else {
            pauseTimer();
        }
    }
    });

    $('#reset-btn').click(function () {
        pauseTimer();
        timerDuration = undefined;
        updateDisplay(0, 0, 0);
        $('#minutes').val('');
        $('#seconds').val('');
        $('#error-message').text(''); // Clear error message
        count = 0;
        $('#count-display').text(`Count: ${count}`);
        isRunning = false;
    });

    $('#dark-mode-toggle').change(function () {
        $('body').toggleClass('dark-mode');
    });

    $('.btn-increment').click(function () {
        var input = $(this).siblings('input[type="number"]');
        input.val((parseInt(input.val(), 10) || 0) + 1);
    });

    $('.btn-decrement').click(function () {
        var input = $(this).siblings('input[type="number"]');
        var value = parseInt(input.val(), 10) || 0;
        if (value > 0) {
            input.val(value - 1);
        }
    });

    $('.shortcut').click(function () {
        var minutes = $(this).data('minutes');
        var seconds = $(this).data('seconds');
        $('#minutes').val(minutes);
        $('#seconds').val(seconds);
    
        // Reset and stop the timer if it's running
        if (isRunning) {
            pauseTimer(); // This will stop the timer and set isRunning to false
        }
        timerDuration = (minutes * 60 + seconds) * 1000; // Update timerDuration with the new value
    });
});
