<script lang="ts">
import { TheImageProxy } from '@/composables/image'
export default {
  name: 'FlipTwo',
}
</script>

<script lang='ts' setup>
const router = useRouter()

const size = useSessionStorage('size', 100)
</script>

<template>
  <div flex gap-4 justify-center>
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
  <div mx-auto mt-50 flex="! col sm:row gap-4" items-center w-200>
    <p flex-1>
      客户端使用 https url 访问服务器，则要求 web 服务器建立 ssl 链接。
      web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），传输给客户端。
      客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。
      客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。
      web 服务器通过自己的私钥解密出会话密钥。
      web 服务器通过会话密钥加密与客户端之间的通信。
      https://www.bilibili.com/video/BV1sa41147qH/?vd_source=b22d833225e32c8479904bac0d743def
      0:09:00
    </p>
    <TheImageProxy :style="{ width: `${size}px`, height: `${size}px` }" rounded-50 />
  </div>
</template>

<style lang='less' scoped>

</style>
