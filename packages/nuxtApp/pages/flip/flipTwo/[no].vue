<script lang='ts' setup>
import { imgs } from '../data'

defineOptions({ name: 'FlipTwo' })

const router = useRouter()
const route = useRoute()
const no = route.params.no as string
const size = useSessionStorage('size', 100)

const img = imgs.find(item => `${item.id}` === no)!.img

const Comp = defineComponent({
  setup() {
    onMounted(() => {
      console.log('test mounted')
    })

    onUnmounted(() => {
      console.log('test unmounted')
    })
    return () => ''
  },
})
</script>

<template>
  <div>
    <div flex justify-center gap-4>
      <button btn @click="router.back">
        back
      </button>

      <button btn @click="size += 20">
        enlarge
      </button>

      <button btn @click="size = 100">
        reset
      </button>
    </div>
    <div flex="! col sm:row gap-4" mx-auto mt-50 w-200 items-center>
      <Starport :port-id="1" :style="{ width: `${size}px`, height: `${size}px` }" rounded-50>
        <TheImage :img="img" />
      </Starport>

      <p flex-1>
        客户端使用 https url 访问服务器，则要求 web 服务器建立 ssl 链接。
        web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），传输给客户端。
        客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。
        客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。
        web 服务器通过自己的私钥解密出会话密钥。
        web 服务器通过会话密钥加密与客户端之间的通信。
        <a hover:text-red href="https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def">https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def</a>
      </p>

      <Starport :port-id="2" :style="{ width: `${size}px`, height: `${size}px` }" rounded-50>
        <TheImage :img="img" />
      </Starport>
    </div>
  </div>
</template>
