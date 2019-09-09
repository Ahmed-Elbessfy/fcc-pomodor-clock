// Variables
// Elements
const togglePlay = document.querySelector('#start_stop');
const reset = document.querySelector('#reset');
const sessionInc = document.querySelector('#session-increment');
const sessionLength = document.querySelector('#session-length');
const sessionDec = document.querySelector('#session-decrement');
const breakInc = document.querySelector('#break-increment');
const breakLength = document.querySelector('#break-length');
const breakDec = document.querySelector('#break-decrement');
const currentTimer = document.querySelector('#timer-label');
const timer = document.querySelector('#time-left');
const beep = document.querySelector('#beep')

// Process Variables
let timerDuration = `${sessionLength.innerHTML}:00`
let state = 'pause'
let intervalSession, intervalBreak, intervalTotal

// FunctionS
const editTiming = (clickedID) => {
  if (clickedID === 'session-increment') {
    if (sessionLength.innerHTML < 60) {
      sessionLength.innerHTML++
    }
  }
  if (clickedID === 'break-increment') {
    if (breakLength.innerHTML < 60) {
      breakLength.innerHTML++
    }
  }
  if (clickedID === 'session-decrement') {
    if (sessionLength.innerHTML > 1) {
      sessionLength.innerHTML--
    }
  }
  if (clickedID === 'break-decrement') {
    if (breakLength.innerHTML > 1) {
      breakLength.innerHTML--
    }
  }
  timerDuration = `${sessionLength.innerHTML}:00`
  if (timerDuration.length == 4) {
    timer.innerHTML = `0${timerDuration}`
  } else {
    timer.innerHTML = timerDuration
  }
}

const timerFunc = () => {
  console.log('timerFunc is called')
  if (state == 'pause') {
    state = 'play';
    togglePlay.innerHTML = `<i class="fas fa-pause fa-lg"></i>`
    if (timerDuration.length == 4) {
      timer.innerHTML = `0${timerDuration}`;
    }

    intervalSession = setInterval(() => {
      currentTimer.innerHTML = 'session'
      let timeLeft = timer.innerHTML.split(':').map(n => Number(n))
      let minSes = timeLeft[0], secSes = timeLeft[1]

      if (minSes > -1) {
        if (secSes == 0) {
          minSes--
          secSes = 59
        } else if (secSes > 0) {
          secSes--
        }
      }

      if (secSes < 10 && minSes < 10) {
        timer.innerHTML = `0${minSes}` + ":" + `0${secSes}`
      } else if (secSes < 10 && minSes >= 10) {
        timer.innerHTML = `${minSes}` + ":" + `0${secSes}`
      } else if (secSes >= 10 && minSes < 10) {
        timer.innerHTML = `0${minSes}` + ":" + `${secSes}`
      } else {
        timer.innerHTML = `${minSes}` + ":" + `${secSes}`
      }

      if (minSes < 0 && secSes == 59) {
        beep.play()
        clearInterval(intervalSession)
        currentTimer.innerHTML = 'break'

        timerDuration = `${breakLength.innerHTML}:00`
        if (timerDuration.length == 4) {
          timer.innerHTML = `0${timerDuration}`;
        } else {
          timer.innerHTML = timerDuration;
        }

        intervalBreak = setInterval(() => {
          let timeLeft = timer.innerHTML.split(':').map(n => Number(n))
          let minBr = timeLeft[0], secBr = timeLeft[1]

          if (minBr > -1) {
            if (secBr == 0) {
              minBr--
              secBr = 59
            } else if (secBr > 0) {
              secBr--
            }
          }

          if (secBr < 10 && minBr < 10) {
            timer.innerHTML = `0${minBr}` + ":" + `0${secBr}`
          } else if (secBr < 10 && minBr >= 10) {
            timer.innerHTML = `${minBr}` + ":" + `0${secBr}`
          } else if (secBr >= 10 && minBr < 10) {
            timer.innerHTML = `0${minBr}` + ":" + `${secBr}`
          } else {
            timer.innerHTML = `${minBr}` + ":" + `${secBr}`
          }

          if (minBr == 0 & secBr == 0) {
            clearInterval(intervalBreak)
            beep.play()
            togglePlay.innerHTML = `<i class="fas fa-play fa-lg"></i>`
            state = 'pause'
          }
        }, 1000)
      }
    }, 1000)
  } else {
    state = 'pause'
    clearInterval(intervalSession)
    clearInterval(intervalBreak)
    togglePlay.innerHTML = `<i class="fas fa-play fa-lg"></i>`
    timerDuration = timer.innerHTML
  }
}

const resetFunc = () => {
  beep.pause()
  beep.currentTime = 0
  clearInterval(intervalSession)
  clearInterval(intervalBreak)
  sessionLength.innerHTML = 25
  breakLength.innerHTML = 5
  currentTimer.innerHTML = 'session'
  timerDuration = `${sessionLength.innerHTML}:00`
  timer.innerHTML = timerDuration
  togglePlay.innerHTML = `<i class="fas fa-play fa-lg"></i>`
  state = 'pause'
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
  timer.innerHTML = timerDuration
  if (timerDuration.length == 4) {
    timer.innerHTML = `0${timerDuration}`
  } else {
    timer.innerHTML = timerDuration
  }
})
sessionDec.addEventListener('click', (e) => editTiming(e.target.id))
sessionInc.addEventListener('click', (e) => editTiming(e.target.id))
breakDec.addEventListener('click', (e) => editTiming(e.target.id))
breakInc.addEventListener('click', (e) => editTiming(e.target.id))

reset.addEventListener('click', resetFunc)
togglePlay.addEventListener('click', () => {
  timerFunc()
  setInterval(() => {
    if (timer.innerHTML == '00:00' && currentTimer.innerHTML === 'break') {
      currentTimer.innerHTML = 'session'
      timerFunc()
    }
  }, 1000)
})
