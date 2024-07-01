import type { DrawCanvasState } from './state'

export function initDrawFn(canvas: Ref<HTMLCanvasElement>, context: CanvasRenderingContext2D, state: DrawCanvasState) {
  let mDown = false
  const ctx = context

  const PI = Math.PI
  const canvasState = {
    initPos: {} as { x: number, y: number },
  }

  function drawCircle(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined) {
    ctx.arc(x, y, ctx.lineWidth / 2, 0, PI * 2)
    ctx.stroke()
  }

  function drawPointer(x: number, y: number) {
    ctx.beginPath()

    ctx.arc(x, y, ctx.lineWidth / 2, 0, PI * 2)
    ctx.fill()
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  function eraser(x: number, y: number) {
    ctx.beginPath()
    ctx.clearRect(x - (state.eraser.size / 2), y - (state.eraser.size / 2), state.eraser.size, state.eraser.size)
    ctx.stroke()
  }

  useEventListener(canvas, 'mousedown', (e) => {
    mDown = true
    const x = e.offsetX
    const y = e.offsetY
    canvasState.initPos = { x, y }

    if (state.eraser.enabled) {
      state.setEraser ({
        x, y,
      })

      return
    }

    drawPointer(x, y)
  })

  useEventListener(canvas, 'mouseup', () => {
    mDown = false

    ctx.closePath()
  })

  useEventListener(canvas, 'mousemove', (e) => {
    const x = e.offsetX
    const y = e.offsetY

    if (state.eraser.enabled) {
      state.setEraser ({
        x, y,
      })
      if (mDown)
        eraser(x, y)

      return
    }

    if (!mDown)
      return

    drawLine(canvasState.initPos.x, canvasState.initPos.y, x, y)
    canvasState.initPos = { x, y }
  })
  return context
}
