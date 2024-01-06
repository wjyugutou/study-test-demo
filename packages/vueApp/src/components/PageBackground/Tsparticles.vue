<script lang='ts' setup>
const options = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  // 全屏
  fullScreen: true,
  // 帧数
  fpsLimit: 60,
  // 交互
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'push',
        load: () => {
          console.log(11111)
        },
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  // 粒子
  particles: {
    color: {
      value: '#d6152f',
    },
    links: {
      color: '#2fd615',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false,
      MoveGravity: {
        enable: true,
      },
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    // shape: {
    //   type: 'circle',
    // },
    shape: {
      type: 'emoji',
      options: {
        emoji: {
          value: '😅',
        },
      },
    },
    size: {
      value: {
        min: 16,
        max: 20,
      },
    },
  },

  detectRetina: false,
}

async function particlesLoaded(container: any) {
  console.log('Particles container loaded', container)
}

onMounted(() => {
})
</script>

<template>
  <div>
    <vue-particles
      id="tsparticles"
      class="h-full"
      :particles-loaded="particlesLoaded"
      :options="options"
    />
    <slot />
  </div>
</template>
