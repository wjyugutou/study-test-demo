const loadingMap = new Map<string, HTMLDivElement>()

function createLoadingCss() {
  if (document.getElementById('loading-style'))
    return
  const style = document.createElement('style')
  style.id = 'loading-style'
  style.textContent = `
    .loading-parent {
      position: relative !important;
    }
    .loading {
      width: 50px;
      padding: 8px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: #3399CC;
      --_m: 
        conic-gradient(#0000 10%,#000),
        linear-gradient(#000 0 0) content-box;
      -webkit-mask: var(--_m);
              mask: var(--_m);
      -webkit-mask-composite: source-out;
              mask-composite: subtract;
      animation: l3 1s infinite linear;
    }
    @keyframes l3 {
      to {
        transform: rotate(1turn)
      }
    }
  `
  document.head.appendChild(style)
}

function addLoading(el: HTMLElement) {
  const loadingId = `loading-${Date.now()}`
  el.setAttribute('loading-id', loadingId)

  const loadingMask = document.createElement('div')
  loadingMask.className = 'loading-mask'
  loadingMask.style.position = 'absolute'
  loadingMask.style.top = `0`
  loadingMask.style.bottom = `0`
  loadingMask.style.left = `0`
  loadingMask.style.right = `0`
  loadingMask.style.alignContent = `center`
  loadingMask.style.zIndex = '1'
  loadingMask.style.backgroundColor = 'rgb(107 114 128 / 0.5)'

  const loadingSpin = document.createElement('div')
  loadingSpin.className = 'loading'
  loadingSpin.style.width = '50px'
  loadingSpin.style.height = '50px'
  loadingSpin.style.margin = 'auto'

  loadingMask.appendChild(loadingSpin)

  el.appendChild(loadingMask)
  el.classList.add('loading-parent')
  loadingMap.set(loadingId, loadingMask)
}

function removeLoading(el: HTMLElement) {
  const id = el.getAttribute('loading-id') || ''
  const loadingDiv = loadingMap.get(id)
  if (loadingDiv) {
    loadingDiv.remove()
    el.classList.remove('loading-parent')
    el.removeAttribute('loading-id')
    loadingMap.delete(id)
  }
}

function open(el: HTMLElement = document.body) {
  addLoading(el)
}

function close(el: HTMLElement = document.body) {
  removeLoading(el)
}

export function useLoading(): [typeof open, typeof close] {
  createLoadingCss()

  return [open, close]
}
