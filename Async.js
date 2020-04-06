export default {
  props: {
    pipe: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      history: []
    }
  },
  methods: {
    exec: function () {
      let input = this.params
      for (let i = 0; i < this.pipe.length; i++) {
        const func = this.pipe[i]
        const name = func.name
        try {
          this.history.push(name)
          input = func(input)
        } catch (e) {
          console.dir(e)
          this.error(e, name)
          break
        }
      }
      return input
    },
    error (e, name) {
      const h = this.history.map(e => e.split(' ')[1])
      const last = h[h.length - 1]
      h.length -= 1
      console.error(
`%cError%c
${h.join(' > ')} > %c${last}%c

${e}`,
'font-weight: bold',
'font-weight: 300',
'font-weight: bold; ',
'font-weight: 300'
      )
    }
  },
  render () {
    return this.$scopedSlots.default({
      exampleProp: this.params
    })
  }
}
