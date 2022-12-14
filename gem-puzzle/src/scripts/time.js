var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms, temp = 0;
var readout = '';
var h = 1,
m = 1,
tm = 1,
s = 0,
ts = 0,
ms = 0,
init = 0;

export function ClearСlock() {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    temp = 0;
    readout = '00:00:00';
    let time = document.querySelector('.time')
    time.innerHTML = readout
}

function StartTime() {
    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime()) - (temp * 1000);
    if (t > 999) {
        temp++
        s++
    }
    if (s >= (m * base)) {
        ts = 1
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) {
            ts = ts - ((m - 1) * base);
        }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) {
        tm = tm - ((h - 1) * base);
        }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
        ms = 0;
    }
    if (ms == 0) {
        ms = '00';
    }
    if (ms > 0 && ms <= 9) {
        ms = '0' + ms;
    }
    if (ts > 0) {
        ds = ts;
        if (ds < 10) {
            ds = '0' + ts;
        }
    } else {
        ds = '00';
    }
    dm = tm - 1;
    if (dm > 0) {
        if (dm < 10) {
        dm = '0' + dm;
        }
    } else {
        dm = '00';
    }
    dh = h - 1;
    if (dh > 0) {
        if (dh < 10) {
        dh = '0' + dh;
        }
    } else {
        dh = '00';
    }
    readout = dh + ':' + dm + ':' + ds;
    let time = document.querySelector('.time')
    time.innerHTML = readout
    let winText = document.getElementById('win-text')
    let moves = document.querySelector('.moves')
    winText.innerHTML = `Hooray! You solved the puzzle in ${readout} and ${moves.textContent} moves!`
    clocktimer = setTimeout(StartTime, 1);
}

export function StartStop() {
    if (init == 0) {
        ClearСlock();
        dateObj = new Date();
        StartTime();
        init = 1;
    } else {
        init = 0;
        ClearСlock();
        clearTimeout(clocktimer);
    }
}

export function continueTime(dateInp){
    s = Number(dateInp[2])
    m = Number(dateInp[1])
    h = Number(dateInp[0])
    clocktimer = setTimeout(StartTime, 1);
}
