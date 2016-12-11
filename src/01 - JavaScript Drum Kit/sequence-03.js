/* global AudioContext, XMLHttpRequest */

function start () {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()

  function loadAudio (url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'arraybuffer'

      // Decode asynchronously
      request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
          resolve(buffer)
        }, reject)
      }
      request.send()
    })
  }

  function playSound (buffer, time) {
    const source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)
    if (!source.start) {
      source.start = source.noteOn
    }
    source.start(time)
  }

  let hithatBuffer
  let kickBuffer
  let snareBuffer

  function load () {
    return Promise.all([
      loadAudio('sounds/hihat.wav').then((buffer) => { hithatBuffer = buffer }),
      loadAudio('sounds/kick.wav').then((buffer) => { kickBuffer = buffer }),
      loadAudio('sounds/snare.wav').then((buffer) => { snareBuffer = buffer })
    ])
  }

  let play = () => {
    // We'll start playing the rhythm 100 milliseconds from "now"
    const startTime = context.currentTime
    const tempo = 120 // BPM (beats per minute)
    const eighthNoteTime = (60 / tempo) / 2

    // Play 2 bars of the following:
    for (let bar = 0; bar < 2; bar++) {
      const time = startTime + bar * 8 * eighthNoteTime
      // Play the bass (kick) drum on beats 1, 5
      playSound(kickBuffer, time)
      playSound(kickBuffer, time + 4 * eighthNoteTime)

      // Play the snare drum on beats 3, 7
      playSound(snareBuffer, time + 2 * eighthNoteTime)
      playSound(snareBuffer, time + 6 * eighthNoteTime)

      // Play the hi-hat every eighthh note.
      for (let i = 0; i < 8; ++i) {
        playSound(hithatBuffer, time + i * eighthNoteTime)
      }
    }
  }

  load().then(play)
}

window.onload = start
