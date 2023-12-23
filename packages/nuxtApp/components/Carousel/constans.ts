import type { InjectionKey, MaybeRef } from 'vue'

export const CarouselCurrentIndexKey = Symbol('currentIndex') as InjectionKey<MaybeRef<number>>
export const CarouselDataLenKey = Symbol('dataLen') as InjectionKey<MaybeRef<number>>
