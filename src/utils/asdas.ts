function request() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const a = Math.random()
      if (a > 0.9) {
        resolve('success')
        console.log(a)
      }
      else { reject(Error('safasdf')) }
    }, 500)
  })
}

async function retry(func: Function, times = 0, delay = 0): Promise<number | Error> {
  return new Promise((resolve, reject) => {
    const inner = async () => {
      try {
        const res = await func()
        resolve(res)
      }
      catch (err) {
        console.log(times--)
        if (times === 0) { reject(err) }
        else {
          setTimeout(() => {
            inner()
          }, delay)
        }
      }
    }
    inner()
  })
}

export { request, retry }

export class MyPromise<T = any> {
  PromiseState: 'pending' | 'resolved' | 'rejected' = 'pending'
  PromiseResult: any = null

  constructor(executor: Function) {
    this.initBind()
    try {
      // 执行传进来的函数
      executor(this.resolve, this.reject)
    }
    catch (e) {
      // 捕捉到错误直接执行reject
      this.reject(e)
    }
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve() {
    console.log('resolve', this)

    if (this.PromiseState !== 'pending')
      return
    this.PromiseState = 'resolved'
    this.PromiseResult = 'success'
  }

  reject() {
    console.log('reject', this)

    if (this.PromiseState !== 'pending')
      return
    this.PromiseState = 'rejected'
    this.PromiseResult = 'error'
  }

  then(resolve: Function, reject: Function) {
    console.log('then', this)

    // 参数校验，确保一定是函数
    resolve = typeof resolve === 'function' ? resolve : (val: T) => val
    reject = typeof reject === 'function' ? reject : (reason: Error) => { throw reason }

    if (this.PromiseState === 'resolved')
      resolve(this.PromiseResult)

    else
      reject(this.PromiseResult)
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('promisexxxxx', () => {
    const a = new MyPromise<any>((resolve, reject) => {
      resolve('成功')
    })
    expect(
      // 输出 ”成功“
      a.then(res => console.log(res, '111'), err => console.log(err, '222')),

    ).toMatchInlineSnapshot('undefined')
  })
}
