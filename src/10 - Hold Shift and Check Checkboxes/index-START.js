const checkboxes = document.querySelectorAll('input')
let lastIndex = -1
checkboxes.forEach((checkbox, index) => {
  checkbox.dataset.index = index
  checkbox.addEventListener('click', (ev) => {
    const currentIndex = ev.target.dataset.index
    const currentCheckedState = ev.target.checked
    if (ev.shiftKey) {
      if (lastIndex >= 0) {
        if (lastIndex < currentIndex) {
          for (let i = lastIndex; i <= currentIndex; i++) {
            const currentElement = document.querySelector(`input[data-index="${i}"]`)
            currentElement.checked = currentCheckedState
          }
        } else {
          for (let i = lastIndex; i >= currentIndex; i--) {
            const currentElement = document.querySelector(`input[data-index="${i}"]`)
            currentElement.checked = currentCheckedState
          }
        }
      }
    } else {
      lastIndex = currentIndex
      console.log(`--lastIndex--`); console.log(lastIndex) // DEBUG
    }
  })
})
