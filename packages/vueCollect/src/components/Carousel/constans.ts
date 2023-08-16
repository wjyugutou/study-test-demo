import type { InjectionKey } from 'vue'

export const CarouselCurrentIndexKey = Symbol('currentIndex') as InjectionKey<number>
export const CarouselDataLenKey = Symbol('dataLen') as InjectionKey<number>
