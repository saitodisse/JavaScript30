let elements = document.querySelectorAll('input')
function _handleUpdate () {
  document.documentElement.style.setProperty(`--${this.name}`, this.value)
}

elements.forEach(ele => {
  ele.addEventListener('change', _handleUpdate)
})
