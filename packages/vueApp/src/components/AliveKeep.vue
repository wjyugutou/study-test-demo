<!-- 缓存不销毁 -->
<!-- eslint-disable -->
<!-- @ts-nocheck -->
<script lang="ts">
import type { ConcreteComponent } from 'vue'
// 
enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

export default defineComponent({
  name: 'AliveKeep',
  __isKeepAlive: true,
  setup(props, { slots }) {
    type CacheKey = string | number | symbol | ConcreteComponent

    const instance = getCurrentInstance()!
    const cache = new Map()
    const keys = new Set()

    const sharedContext = instance.ctx

    let pendingCacheKey: CacheKey | null = null

    const cacheSubtree = () => {
      if (pendingCacheKey != null)

        cache.set(pendingCacheKey, instance.subTree)
    }

    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement },
      },
    } = sharedContext
    const storageContainer = createElement('div')

    sharedContext.activate = () => {
      console.log('sharedContext.activate')
    }

    sharedContext.deactivate = (vnode: VNode) => {
      console.log('sharedContext.deactivate')
    }

    onMounted(cacheSubtree)
    onUpdated(cacheSubtree)

    let current: VNode | null = null

    return () => {
      if (!slots.default)
        return null

      const children = slots.default!()

      console.log({ children })

      const vnode = children[0]

      const comp = vnode.type
      const name = comp.name || comp.__name

      const key = vnode.key == null ? comp : vnode.key

      const cachedVNode = cache.get(key)

      // if (vnode.el) {
      //   vnode = cloneVNode(vnode);
      // }

      pendingCacheKey = key

      if (cachedVNode) {
        vnode.el = cachedVNode.el
        vnode.component = cachedVNode.component
        // 避免 vnode 节点作为新节点被挂载
        vnode.shapeFlag |= 512 /* COMPONENT_KEPT_ALIVE */
        keys.delete(key)
        keys.add(key)
      }
      else {
        keys.add(key)
        pruneCacheEntry(keys.values().next().value)
      }

      function pruneCacheEntry(key: CacheKey) {
        const cached = cache.get(key) as VNode

        // if (!current || !isSameVNodeType(cached, current)) {
        //   unmount(cached)
        // } else if (current) {
        //   // current active instance should no longer be kept-alive.
        //   // we can't unmount it now but it might be later, so reset its flag now.
        //   resetShapeFlag(current)
        // }
        // cache.delete(key)
        // keys.delete(key)
      }

      console.log({ vnode })

      vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE

      current = vnode
      return vnode
    }
  },
})
</script>
