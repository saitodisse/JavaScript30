let elements = document.querySelectorAll('input')
function _handleUpdate () {
  document.documentElement.style.setProperty(`--${this.name}`, this.value)
}

elements.forEach(ele => {
  ele.addEventListener('change', _handleUpdate)
})


let items = document.querySelectorAll('.item')
function _handleClick (ev) {
  ev.preventDefault();
  const currentFlexGrow = Number(document.documentElement.style.getPropertyValue(`--flex-grow-${this.id}`)) || 0
  let newFlexGrowValue = currentFlexGrow
  if (ev.button === 0 && newFlexGrowValue > 0) {
    newFlexGrowValue--;  
  } else  if (ev.button === 2) {
    newFlexGrowValue++;
  }
  document.documentElement.style.setProperty(`--flex-grow-${this.id}`, newFlexGrowValue)
  this.querySelector('p').textContent = `flex-grow: ${newFlexGrowValue}`
}

items.forEach(ele => {
  ele.addEventListener('click', _handleClick)
  ele.addEventListener('contextmenu', _handleClick)
})

document.querySelector('#flex-grow-reset-0').addEventListener('click', () => {
  // clear css variables
  document.documentElement.style.removeProperty('--flex-grow-item-1')
  document.documentElement.style.removeProperty('--flex-grow-item-2')
  document.documentElement.style.removeProperty('--flex-grow-item-3')
  document.documentElement.style.removeProperty('--flex-grow-item-4')
  document.documentElement.style.removeProperty('--flex-grow-item-5')

  // reset flex-grow texts
  document.querySelectorAll('.item p').forEach((p) => {
    p.textContent = 'flex-grow: 0'
  })
})

document.querySelector('#flex-grow-reset-1').addEventListener('click', () => {
  // clear css variables
  document.documentElement.style.removeProperty('--flex-grow-item-1')
  document.documentElement.style.removeProperty('--flex-grow-item-2')
  document.documentElement.style.removeProperty('--flex-grow-item-3')
  document.documentElement.style.removeProperty('--flex-grow-item-4')
  document.documentElement.style.removeProperty('--flex-grow-item-5')

  // set all flex-grow to 1
  document.documentElement.style.setProperty('--flex-grow-item-1', 1)
  document.documentElement.style.setProperty('--flex-grow-item-2', 1)
  document.documentElement.style.setProperty('--flex-grow-item-3', 1)
  document.documentElement.style.setProperty('--flex-grow-item-4', 1)
  document.documentElement.style.setProperty('--flex-grow-item-5', 1)

  // reset flex-grow texts
  document.querySelectorAll('.item p').forEach((p) => {
    p.textContent = 'flex-grow: 1'
  })
})

