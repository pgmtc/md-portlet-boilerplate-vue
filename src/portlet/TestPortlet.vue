<template>
  <div>
    <h5>Test 1</h5>
    <button @click="callHttp">Call HTTP</button>
    <button @click="callApi">Call API</button>
    <button @click="callJob">Call Job</button>
    <button @click="callBroadcast">Broadcast</button>
    <div>
      {{response}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test-vue-portlet',
    mounted () {
      console.log(this.$ctx)
      this.$ctx.socket.on('broadcastResponse', (msg) => {
        let from = msg.context.auth.email
        this.response = `from ${from}: ${msg.message}`
      });
    },
    data () {
      return {
        cnt: 0,
        response: null
      }
    },
    computed: {

    },

    methods: {
      callHttp () {
        this.cnt++
        this.$ctx.httpGet('/api/work').then((data) => {
          this.response = data;
        })
      },
      callApi () {
        this.cnt++
        this.$ctx.apiCall('doSomeWork', [123, 'abc']).then((data) => {
          this.response = data
        })
      },
      callJob () {
        this.cnt++
        this.$ctx.apiJob('doSomeWorkAsync', [123, 'abc'], this.jobMessageHandler).then((data) => {
          this.response = data
        })
      },
      jobMessageHandler(msg) {
        this.response = msg
      },
      callBroadcast () {
        this.$ctx.broadcast('broadcastResponse','Hey there')
      }
    },
    props: ['$ctx']
  }

</script>

<style scoped>

</style>
