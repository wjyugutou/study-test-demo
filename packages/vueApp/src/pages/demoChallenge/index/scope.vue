<script lang='ts' setup>
import type { CSSProperties } from 'vue'

defineOptions({
  description: '炫彩边框 动画',
})

const box = ref() as Ref<HTMLDivElement>
const dragStyle = reactive<CSSProperties>({
  top: '0px',
  left: '0px',
  transform: 'translateZ(0px)',
})
const contentStyle = reactive<CSSProperties>({
  top: '0px',
  left: '0px',
})

function pointerdown(de: PointerEvent) {
  let initX = de.x
  let initY = de.y
  const maxX = window.innerWidth - box.value!.clientWidth
  const maxY = parent.innerHeight - box.value!.clientHeight;

  (de.target as Element).setPointerCapture(de.pointerId)

  const stopMove = useEventListener(box, 'mousemove', (e: MouseEvent) => {
    e.preventDefault()
    const curX = e.x
    const curY = e.y
    const disX = curX - initX
    const disY = curY - initY
    initX = e.x
    initY = e.y
    const dragTop = Number.parseInt(`${dragStyle.top!}`) + disY
    const dragLeft = Number.parseInt(`${dragStyle.left!}`) + disX

    if (dragLeft < 0 || dragLeft > maxX || dragTop < 0 || dragTop > maxY)
      return

    dragStyle.top = `${dragTop}px`
    dragStyle.left = `${dragLeft}px`
    contentStyle.top = `${Number.parseInt(`${contentStyle.top!}`) - disY}px`
    contentStyle.left = `${Number.parseInt(`${contentStyle.left!}`) - disX}px`
  })

  const stopLeave = useEventListener(box, 'pointerleave', (e: MouseEvent) => {
    stopMove()
    stopLeave();
    (de.target as Element).releasePointerCapture(de.pointerId)
  })
  const stopUp = useEventListener(box, 'pointerup', (e: MouseEvent) => {
    stopMove()
    stopUp();
    (de.target as Element).releasePointerCapture(de.pointerId)
  })
}

useDrag(box)
</script>

<template>
  <div ref="box" absolute h-100 w-100 select-none overflow-hidden :style="dragStyle" @pointerdown="pointerdown">
    <div class="inner" relative h-1080px w-1920px p-10 :style="contentStyle">
      <h3 class="mb-2 mt-4 font-bold">
        The standard Lorem Ipsum passage, used since the 1500s
      </h3><p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p><h3 class="mb-2 mt-4 font-bold">
        Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
      </h3><p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p><h3 class="mb-2 mt-4 font-bold">
        1914 translation by H. Rackham
      </h3><p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p><h3 class="mb-2 mt-4 font-bold">
        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
      </h3><p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p><h3 class="mb-2 mt-4 font-bold">
        1914 translation by H. Rackham
      </h3><p>"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."</p>
    </div>
    <div class="clip" />
  </div>
</template>

<style scoped>
.inner  {
  pointer-events: none;
}

.clip {
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid;
  border-image-source: linear-gradient(45deg, rgb(184 159 218), rgb(15 48 194));
  border-image-slice: 1;
  width: 100%;
  height: 100%;
  animation: clip-border 2s infinite;
  animation-timing-function: linear;

  /* 边框位置 */
  clip-path: inset(0 90% 0 0);
}

@keyframes clip-border {
  0%,
  100% {
    clip-path: inset(90% 0 0 0);
    filter: hue-rotate(0deg);
  }

  25% {
    clip-path: inset(0 90% 0 0);
  }

  50% {
    clip-path: inset(0 0 90% 0);
    filter: hue-rotate(360deg);
  }

  75% {
    clip-path: inset(0 0 0 90%);
  }

}
</style>
