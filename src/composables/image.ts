import { createStarport } from './starport'

import TheImage from '@/components/starPort/TheImage.vue'

const { container: TheImageContainer, proxy: TheImageProxy } = createStarport(TheImage)

export {
  TheImageContainer,
  TheImageProxy,
}
