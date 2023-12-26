<script lang='ts' setup>
import type { Ref, ShallowRef } from 'vue'

defineOptions({ description: 'Recorder 录音' })
const recording = ref(false)
const recorder = shallowRef() as ShallowRef<MediaRecorder>
const mediasStream = shallowRef() as ShallowRef<MediaStream>
const blobAudio = ref<Blob[]>([])
const audio = ref() as Ref<HTMLAudioElement>
const audioSrc = ref('blob:http://127.0.0.1:3333/1b7628d0-7b9f-4707-a0eb-3182c2a1dff6')

function getStream() {
  return new Promise<MediaStream>((resolve, reject) => {
    navigator?.mediaDevices?.getUserMedia({
      audio: true,
    }).then((stream) => {
      resolve(stream)
    }).catch(err => reject(err))
  })
}

async function recordBegin() {
  if (!navigator?.mediaDevices?.getUserMedia) {
    alert('浏览器不支持音频输入')
    return
  }
  recording.value = true
  blobAudio.value = []
  mediasStream.value = await getStream()

  recorder.value = new MediaRecorder(mediasStream.value)

  recorder.value.start()
  recorder.value.ondataavailable = (e) => {
    blobAudio.value.push(e.data)
    const blob = new Blob(blobAudio.value, { type: 'audio/wav' }) // 此前只是把blob数据存储在数组中，必须把数组转化为blob对象才能生存url

    audioSrc.value = URL.createObjectURL(blob)
  }
}

watch(audioSrc, (cur, prev) => {
  URL.revokeObjectURL(prev)
})

function recordEnd() {
  recording.value = false
  recorder.value.stop()
}

function playAudio() {
  console.log(audioSrc.value)
  audio.value.play()
}

onBeforeUnmount(() => {
  mediasStream.value?.getTracks().forEach(track => track.stop())
})
</script>

<template>
  <h1>recorder 录音</h1>
  <button class="basic-btn" @mousedown="recordBegin" @mouseup="recordEnd">
    {{ !recording ? '开始' : '结束' }}录音
  </button>
  <button class="basic-btn" @click="playAudio">
    播放录音
  </button>
  <audio ref="audio" :src="audioSrc" preload="auto" />
</template>
