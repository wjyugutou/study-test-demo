interface StateObserver<T> {
  state: T
  on<K extends string & keyof T> (
    eventName: `${K}Update`,
    cb: (oldValue: T[K], newValue: T[K]) => void
  ): void
}

type HandlersType<T> = Parameters<StateObserver<T>['on']>

export function stateObserver<T>(state: T extends object ? T : never) {
  const handlers = <Record<HandlersType<T>['0'], Array<HandlersType<T>['1']>>>{}

  const stateProxy = new Proxy(state, {
    set(target, p, newValue, receiver) {
      const oldValue = Reflect.get(target, p)
      const handler = Reflect.get(handlers, `${p as string}Update`)

      if (Array.isArray(handler)) {
        handler.forEach((cb) => {
          cb(oldValue as T[string & keyof T], newValue)
        })
      }
      return Reflect.set(target, p, newValue)
    },
    get(target, p, receiver) {
      return Reflect.get(target, p)
    },
  })

  return {
    state: stateProxy,
    on: (changeName: HandlersType<T>['0'], cb: HandlersType<T>['1']) => {
      const handler = Reflect.get(handlers, `${changeName}`)

      if (Array.isArray(handler))
        handler.push(cb)

      else
        Reflect.set(handlers, `${changeName}`, [cb])
    },
  } as StateObserver<T>
}
