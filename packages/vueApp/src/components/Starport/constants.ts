import type { StarportState } from './state'

export const StarportKey = Symbol('starport') as unknown as InjectionKey<StarportState>
