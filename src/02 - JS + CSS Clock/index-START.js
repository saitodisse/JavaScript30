function getDegRotate (deg) {
  if (deg === 0) {
    return `rotate(0.001deg)`
  }
  return `rotate(${deg}deg)`
}

let secondsToAdd = 0
let minutesToAdd = 0
let hoursToAdd = 0

function renderClockHands (hours, minutes, seconds) {
  const currentDate = new Date()
  let currentHours = currentDate.getHours()
  let currentMinutes = currentDate.getMinutes()
  let currentSeconds = currentDate.getSeconds()

  if (currentSeconds !== seconds % 60) {
    if (currentSeconds === 0) {
      secondsToAdd += 60
    }
    seconds = currentSeconds + secondsToAdd
  }

  if (currentMinutes !== minutes % 60) {
    if (currentMinutes === 0) {
      minutesToAdd += 60
    }
    minutes = currentMinutes + minutesToAdd
  }

  if (currentHours !== hours % 24) {
    if (currentHours === 0) {
      hoursToAdd += 24
    }
    hours = currentHours + hoursToAdd
  }

  const secondHandEle = document.querySelector('body > div > div > div.hand.second-hand')
  const secondsDeg = (seconds / 60 * 360) + 90
  secondHandEle.style.transform = getDegRotate(secondsDeg)

  const minHandEle = document.querySelector('body > div > div > div.hand.min-hand')
  const minDeg = (minutes / 60 * 360) + 90
  minHandEle.style.transform = getDegRotate(minDeg)

  const hourHandEle = document.querySelector('body > div > div > div.hand.hour-hand')
  const hourDeg = (hours / 12) * 360 + 90
  hourHandEle.style.transform = getDegRotate(hourDeg)
}

function start () {
  const initialDate = new Date()
  let hours = initialDate.getHours()
  let minutes = initialDate.getMinutes()
  let seconds = initialDate.getSeconds()
  setInterval(() => renderClockHands(hours, minutes, seconds), 1000)
}

window.onload = start
