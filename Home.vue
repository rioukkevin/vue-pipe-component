
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="$refs.async.exec()">
    <Async ref="async" :pipe="[serialize, api, unserialize]" :params="{base: 10,name:'groot'}">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </Async>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Async from '@/components/Async'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Async
  },
  methods: {
    serialize (params) {
      return {
        name: params.name,
        price: params.base + '€'
      }
    },
    api (params) {
      if (params.price.includes('1')) {
        return {
          httpCode: 400,
          bady: {
            errors: []
          }
        }
      } else {
        return {
          httpCode: 200,
          body: {
            message: [
              "That's good boyz"
            ]
          }
        }
      }
    },
    unserialize (params) {
      if (params.httpCode === 200) {
        console.warn('succes')
      } else {
        return params.body.errors
      }
    }
  }
}
</script>
