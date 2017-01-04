document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#draw')
  const ctx = canvas.getContext('2d')

  let isDrawing = false
  let currentColors = []
  let strokeIndex = 0
  let lastX = 0
  let lastY = 0
  let lineWidth = 1
  let delay = 50

  _setCanvasSize()
  _registerEvents()
  _shortcuts()
  _initializeContext()
  _showInstructions()

  function _setCanvasSize () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function _registerEvents () {
    window.onresize = () => {
      _setCanvasSize()
    }
  }

  function _shortcuts () {
    window.addEventListener('keydown', (ev) => {
      // console.log(`key: ${ev.code}`) // DEBUG
      if (ev.code === 'NumpadAdd') {
        lineWidth++
        console.log(`lineWidth: ${lineWidth}`)
      }
      if (ev.code === 'NumpadSubtract') {
        if (lineWidth > 1) {
          lineWidth--
          console.log(`lineWidth: ${lineWidth}`)
        }
      }
      if (ev.code === 'Digit1') {
        delay = 0
        console.log(`delay: ${delay}ms`)
      }
      if (ev.code === 'Digit2') {
        delay = 50
        console.log(`delay: ${delay}ms`)
      }
      if (ev.code === 'Digit3') {
        delay = 100
        console.log(`delay: ${delay}ms`)
      }
      if (ev.code === 'Escape') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    })
  }

  let _saveLastPosition = function (ev) {
    lastX = ev.offsetX
    lastY = ev.offsetY
  }

  function _initializeContext () {
    const canvas = document.querySelector('#draw')

    canvas.addEventListener('mousemove', _draw)
    canvas.addEventListener('mouseup', () => { isDrawing = false })
    canvas.addEventListener('mouseout', () => { isDrawing = false })

    canvas.addEventListener('mousedown', (ev) => {
      ev.preventDefault()
      isDrawing = true
      currentColors = ['#000', '#222', '#444', '#666']
      _saveLastPosition(ev)
    })

    canvas.addEventListener('contextmenu', (ev) => {
      ev.preventDefault()
      isDrawing = true
      currentColors = ['#001867', '#1d41d6']
      _saveLastPosition(ev)
    })
  }

  function _drawLine (ev) {
    if (isDrawing) {
      ctx.strokeStyle = currentColors[strokeIndex % currentColors.length]
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = Math.floor(Math.random() * 2) + lineWidth
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(ev.offsetX, ev.offsetY)
      ctx.stroke()

      strokeIndex++
    }
  }

  function _draw (ev) {
    if (delay === 0) {
      _drawLine(ev)
      _saveLastPosition(ev)
    } else {
      setTimeout(() => {
        _drawLine(ev)
      }, delay)
      _saveLastPosition(ev)
    }
  }

  function _showInstructions () {
    console.info('press + and - to change line witdh')
    console.info('press 1, 2 or 3 to change stroke delay')
    console.info('mouse left and right have distinct colors')
  }
})

