var numsData = {
    '0': [
        '0330', '0915', '0915', '0930',
        '0600', '0330', '0930', '0600',
        '0600', '0600', '0600', '0600',
        '0600', '0600', '0600', '0600',
        '0600', '0300', '0900', '0600',
        '0300', '0915', '0915', '0900'
    ], '1': [
        '0840', '0340', '0930', '0840',
        '0115', '0930', '0600', '0840',
        '0840', '0600', '0600', '0840',
        '0840', '0600', '0600', '0840',
        '0840', '0600', '0600', '0840',
        '0840', '0300', '0900', '0840'
    ], '2': [
        '0330', '0915', '0915', '0930',
        '0300', '0915', '0930', '0600',
        '0330', '0915', '0930', '0600',
        '0600', '0330', '0915', '0900',
        '0600', '0300', '0915', '0930',
        '0300', '0915', '0915', '0900'
    ], '3': [
        '0330', '0915', '0915', '0930',
        '0300', '0915', '0930', '0600',
        '0330', '0915', '0900', '0600',
        '0300', '0915', '0930', '0600',
        '0330', '0915', '0900', '0600',
        '0300', '0915', '0915', '0900'
    ], '4': [
        '0420', '0335', '0915', '0930',
        '0420', '0420', '0638', '0700',
        '0130', '0305', '0900', '0930',
        '0300', '0930', '0330', '0900',
        '0420', '0600', '0600', '0420',
        '0420', '0300', '0900', '0420'
    ], '5': [
        '0330', '0915', '0915', '0930',
        '0600', '0330', '0915', '0900',
        '0600', '0300', '0915', '0930',
        '0300', '0915', '0930', '0600',
        '0330', '0915', '0900', '0600',
        '0300', '0915', '0915', '0900'
    ], '6': [
        '0330', '0915', '0915', '0930',
        '0600', '0330', '0915', '0900',
        '0600', '0300', '0915', '0930',
        '0600', '0330', '0930', '0600',
        '0600', '0300', '0900', '0600',
        '0300', '0915', '0915', '0900'
    ], '7': [
        '0330', '0915', '0915', '0930',
        '0300', '0915', '0745', '0700',
        '0840', '0608', '0608', '0840',
        '0840', '0600', '0600', '0840',
        '0840', '0600', '0600', '0840',
        '0840', '0300', '0900', '0840'
    ], '8': [
        '0330', '0915', '0915', '0930',
        '0600', '0330', '0930', '0600',
        '0600', '0300', '0900', '0600',
        '0600', '0330', '0930', '0600',
        '0600', '0300', '0900', '0600',
        '0300', '0915', '0915', '0900'
    ], '9': [
        '0330', '0915', '0915', '0930',
        '0600', '0330', '0930', '0600',
        '0600', '0300', '0900', '0600',
        '0300', '0915', '0930', '0600',
        '0330', '0915', '0900', '0600',
        '0300', '0915', '0915', '0900'
    ]
};
var animateDuration = 3000;

$.fn.animateRotate = function (angle, duration, easing, complete) {
    return this.each(function () {
        var $elem = $(this);

        $({ deg: Number($elem.attr('angle')) }).animate({ deg: angle }, {
            duration: duration,
            easing: easing,
            step: function (now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
                $elem.attr('angle', now);
            },
            complete: complete || $.noop
        });
    });
};

/** 旋轉指針
 * @param elm {HTMLElement} 指針
 * @param degree {number} 角度
 */
function rotatePointer(elm, degree) {
    if (degree >= 360) {
        degree -= 360;
        elm.css({
            'transform': 'rotate(' + degree + 'deg)'
        });
    }
    elm.animateRotate(degree, animateDuration, 'linear', null, function () {
        elm.css({
            'transform': 'rotate(' + degree + 'deg)'
        });
    });
    elm.attr('angle', degree);
}

/** 設定時鐘
 * @param digitNo {number} 第幾位數
 * @param clockNo {number} 第幾個鐘
 * @param time {string} 時間，格式：HHmm
 */
function setClock(digitNo, clockNo, time) {
    time = moment(time, 'HHmm');
    const hour = Number(time.format('HH'));
    const min = Number(time.format('mm'));
    const $digit = $('.digit').eq(digitNo);
    const $clock = $digit.find('.mini-clock').eq(clockNo);
    const $pointer1 = $clock.find('.pointer1');
    const $pointer2 = $clock.find('.pointer2');
    const curAngle1 = Number($pointer1.attr('angle'));
    const curAngle2 = Number($pointer2.attr('angle'));
    const targetAngle1 = hour * 30;
    const targetAngle2 = min * 6;

    if (targetAngle1 >= curAngle1) rotatePointer($pointer1, targetAngle1);
    else rotatePointer($pointer1, targetAngle1 + 360);
    if (targetAngle2 >= curAngle2) rotatePointer($pointer2, targetAngle2);
    else rotatePointer($pointer2, targetAngle2 + 360);
}

/**
 * 顯示數字
 * @param {number} digitNo 
 * @param {number} num 
 */
function showNumber(digitNo, num) {
    $('.digit').eq(digitNo - 1).find('.mini-clock').each(function (i) {
        setClock(digitNo, i, numsData[num][i])
    })
}

function updateTime() {
    const now = moment().add(1 + animateDuration / 1000, 'seconds');
    const hour = now.format('HH');
    const min = now.format('mm');
    showNumber(0, hour[0]);
    showNumber(1, hour[1]);
    showNumber(2, min[0]);
    showNumber(3, min[1]);
    console.warn('updateTime', now.format());
}

$(function () {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let panelWidth = Number($('.clock').css('width').replace(/px/, ''));
    let panelHeight = Number($('.clock').css('height').replace(/px/, ''));
    let zoomRateX = 1, zoomRateY = 1;
    if (panelWidth > viewportWidth) zoomRateX = viewportWidth / panelWidth;
    else zoomRateX = viewportWidth / panelWidth;
    if (panelHeight > viewportHeight) zoomRateY = viewportHeight / panelHeight;
    else zoomRateY = viewportHeight / panelHeight;
    $('.clock')[0].style.transform = `scale(${Math.min(zoomRateX, zoomRateY) * 0.8})`;

    updateTime();
    let secondsToNextMin = 60 - new Date().getSeconds();
    secondsToNextMin = secondsToNextMin - animateDuration / 1000;
    secondsToNextMin = secondsToNextMin >= 0 ? secondsToNextMin : secondsToNextMin + 60;
    console.warn('secondsToNextMin', secondsToNextMin)
    setTimeout(() => {
        console.warn('first');
        updateTime();
        setInterval(updateTime, 60000);
    }, secondsToNextMin * 1000);
});

// register service worker
navigator.serviceWorker.register('service-worker.js', { scope: "." });