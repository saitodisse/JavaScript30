document.addEventListener('DOMContentLoaded', () => {
  let canvas
  let ctx

  canvas = document.querySelector('#draw')
  ctx = canvas.getContext('2d')

  // _setCanvasSize()
  // _registerEvents()
  _initializeContext()

  function _registerEvents () {
    window.onresize = () => {
      _setCanvasSize()
    }
  }

  function _setCanvasSize () {
    let width = window.innerWidth - 2
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height - 6
  }

  let isDrawing = false
  let lastX = 0
  let lastY = 0

  function _initializeContext () {
    ctx.strokeStyle = '#BADASS'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    document.querySelector('#draw').addEventListener('mousemove', (ev) => {
      console.log(ev)
    })
    // canvas.addEventListener('mousedown', () => { isDrawing = true })
    // canvas.addEventListener('mouseup', () => { isDrawing = false })
    // canvas.addEventListener('mouseout', () => { console.log(`--hello--`) })
  }

  function _draw (ev) {
    if (isDrawing) {
      console.log(`--ev--`); console.log(ev) // DEBUG
    }
  }
})

