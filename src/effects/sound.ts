
export const ThemeSound = async(themeid: string | undefined) => {
  if (themeid === 'a39493c2-c3d7-11ed-afa1-0242ac120002') {
    playSound('ocean.mp4')
  }
  if (themeid === '90052704-c3d7-11ed-afa1-0242ac120002') {
    playSound('forest.mp4')
  }
  if (themeid === 'b038576c-c3d7-11ed-afa1-0242ac120002') {
    playSound('sand.mp3')
  }
}

export const playSound = async(theme: string) => {
  const ctx = new AudioContext();
  let audio: AudioBuffer

  await fetch(theme)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      audio = decodedAudio
    })

  const playback = () => {
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination)
    playSound.start(ctx.currentTime)
  }
  playback();
}