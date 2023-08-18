import type { InjectionKey } from 'vue'
import type { DrawCanvasState } from './state'

export const CanvasConfigKey = Symbol('canvasConfig') as InjectionKey<DrawCanvasState>
