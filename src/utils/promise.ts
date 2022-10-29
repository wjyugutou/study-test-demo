type Resolve = (value: any) => void
type Reject = (reason: any) => void
type Fulfilled = (value: any) => void
type Rejected = (value: any) => void
interface Executor {
  (resolve: Resolve, reject: Reject): void
}

export class MyP {
  status: 'fulfilled' | 'rejected' | 'pending' = 'pending'
  value: any = null
  reason: any = null
  onFulfilledCallbacks: Fulfilled[] = []
  onRejectedCallbacks: Rejected[] = []

  constructor(executor: Executor) {
    try {
      executor(this.resolve, this.reject)
    }
    catch (err) {
      this.reject(err)
    }
  }

  resolve = (value: any) => {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => fn(value))
    }
  }

  reject = (reason: any) => {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn(reason))
    }
  }

  then = (onFulfilled: Fulfilled, onRejected?: Rejected) => {
    const fulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value
    const rejected = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason }

    const thenPromise = new MyP((resolve, reject) => {
      const handleCallback = (cb: Function) => {
        try {
          const res = cb(this.value)
          if (res === thenPromise)
            return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))

          // 如果回调返回结果是个Promise
          if (res instanceof MyP) {
            res.then((val) => {
              resolve(val)
            }, (err) => {
              reject(err)
            })
          }
          else {
            // 返回结果不是Promise
            resolve(res)
          }
        }
        catch (error) {
          reject(error)
        }
      }

      if (this.status === 'fulfilled') { handleCallback(fulfilled) }
      else if (this.status === 'rejected') { rejected(this.reason) }
      else {
        // 如果状态为待定状态，暂时保存两个回调
        this.onFulfilledCallbacks.push(handleCallback.bind(this, fulfilled))
        this.onRejectedCallbacks.push(handleCallback.bind(this, rejected))
      }
    })

    return thenPromise
  }

  catch = (onRejected: Rejected) => {
    onRejected = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason }
    if (this.status === 'rejected')
      onRejected(this.promiseResult)
  }
}

