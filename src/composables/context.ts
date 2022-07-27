export function createStarportContext() {
  return {
    attrs: {},
    props: {},
    landed: false,
    id: '',
    rect: {

    },
    land() {
      this.landed = true
    },
    liftOff() {
      this.landed = false
    },
  }
}
