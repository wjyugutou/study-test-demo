import type { Directive, Plugin } from 'vue'
import auth from './auth'
import loading from './loading'

export type CustomDirective = Directive & {
  name: string
}

const directives: CustomDirective[] = [loading, auth]

const directivePlugins: Plugin = {
  install(app) {
    directives.forEach(d => app.directive(d.name, d))
  },
}

export default directivePlugins
