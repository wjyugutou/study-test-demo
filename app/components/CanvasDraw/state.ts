import type { Position } from '@vueuse/core'

type Keys = 'strokeStyle'
  | 'fillStyle'
  | 'lineWidth'
  | 'lineCap'

type Config = Pick<CanvasRenderingContext2D, Keys>

export function createCanvasState(ctx: Ref<CanvasRenderingContext2D>) {
  const config = ref<Config>({
    strokeStyle: '#9aa2ad',
    fillStyle: '#9aa2ad',
    lineWidth: 10,
    lineCap: 'round', // round  square butt
    // lineJoin: 'miter', //  "bevel" | "miter" | "round"
  })
  const eraser = reactive({
    x: 0,
    y: 0,
    size: 10,
    enabled: false,
  })

  return reactive({
    ctx,
    config,
    eraser,
    setEraser(value: boolean | Position | number) {
      if (typeof value === 'boolean') {
        eraser.enabled = value
      }
      else if (typeof value === 'number') {
        eraser.size = value
      }
      else {
        eraser.x = value.x
        eraser.y = value.y
      }
    },
    setConfig(cfg: Partial<Config>) {
      Object.keys(cfg).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        config.value[key] = cfg[key]
      })
    },
  } as const)
}

export type DrawCanvasState = ReturnType<typeof createCanvasState>
