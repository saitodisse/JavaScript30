document.addEventListener('DOMContentLoaded', () => {

  _setCanvasSize()
  _registerEvents()
  _initializeContext()

  function _registerEvents () {
    window.onresize = () => {
      _setCanvasSize()
    }
  }

  function _setCanvasSize () {
    const canvas = document.querySelector('#draw')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  let lastX = 0
  let lastY = 0

  function _initializeContext () {
    const canvas = document.querySelector('#draw')
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#BADASS'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    let isDrawing = false

    canvas.addEventListener('mousemove', (ev) => _draw(ev, isDrawing))
    canvas.addEventListener('mousedown', () => { isDrawing = true })
    canvas.addEventListener('mouseup', () => { isDrawing = false })
    canvas.addEventListener('mouseout', () => { isDrawing = false })
  }

  function _draw (ev, isDrawing) {
    if (isDrawing) {
      console.log(`--ev--`);
      console.log(ev) // DEBUG
    }
  }
})

