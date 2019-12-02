<template>
  <div class="q-pa-md row justify-center">
    <div class="col-12">
      <template v-for="(item, key) in msgs">
        <q-chat-message :key="key"
          :name="user === item.user? 'Eu': renderUser(item.user)"
          :text="[item.mensagem]"
          :sent="user === item.user?true:false"
        />
      </template>
    </div>
    <div class="col-12">
        <q-input type="text" v-model="msg_send" class="inline" style="width:85%" filled/>
        <q-btn class="col-1" round color="primary" icon="send" @click="send"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: 'http://127.0.0.1:8000/users/1/',
      msgs: [],
      msg_send: ''
    }
  },
  beforeMount () {
    this.loadMessages()
  },
  methods: {
    loadMessages: function (offset = false) {
      let id = 0
      if (offset) {
        let last = this.msgs.slice(-1)[0]
        id = last.url.split('/')
        id = id.slice(-2)[0]
      }
      fetch(`http://127.0.0.1:8000/chat/?offset=${id}`).then(response => {
        response.json().then(data => {
          this.msgs = this.msgs.concat(data.results)
        })
      })
      setTimeout(() => {
        this.loadMessages(true)
      }, 20000)
    },
    send: async function () {
      if (this.msg_send === '') return
      await fetch(`http://127.0.0.1:8000/chat/`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ channel: 'main_channel', user: this.user, mensagem: this.msg_send })
      }).then(response => {
        return response.json()
      }).then(data => {
        let obj = { channel: data.channel, user: data.user, mensagem: data.mensagem, url: data.url }
        this.msgs.push(obj)
      })
      this.msg_send = ''
    },
    renderUser: function (el) {
      if (el === 'http://127.0.0.1:8000/users/1/') {
        return 'User 1'
      }
      if (el === 'http://127.0.0.1:8000/users/2/') {
        return 'User 2'
      }
      if (el === 'http://127.0.0.1:8000/users/3/') {
        return 'User 3'
      }
    }
  }
}
</script>
