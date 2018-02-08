<template>
  <div class="hello">
    <!--<pre>{{ messageObject }}</pre>-->
    <div>
      <div v-for="message in messages" v-bind:key="message.id">
        <h2><b-badge>{{ message.message }}</b-badge></h2>
      </div>
    </div>
    <b-form-input id="new_message_input" type="text" v-model="newMessage" required placeholder="Write Comment"></b-form-input>
    <b-button v-on:click="addMessage()">Send</b-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      messages: [],
      newMessage: ''
    }
  },
  created () {
    let self = this

    this.$firebase.database().ref('message').once('value').then(snapshot => {
      snapshot.forEach(function (messageSnapshot) {
        let message = messageSnapshot.val()
        message.id = messageSnapshot.key
        console.log(messageSnapshot.key)
        self.messages.push(message)
      })
      observeMessage()
    })

    function observeMessage () {
      self.$firebase.database().ref('message').on('child_added', snapshot => {
        const index = self.messages.findIndex(message => message.id === snapshot.key)
        console.log(index)
        console.log(snapshot.key + 'ADDED')
        if (index === -1) {
          let message = snapshot.val()
          message.id = snapshot.key
          self.messages.push(message)
        }
      })

      self.$firebase.database().ref('message').on('child_changed', snapshot => {
        const index = self.messages.findIndex(message => message.id === snapshot.key)
        if (index >= 0) {
          self.messages[index] = snapshot.val()
        }
      })

      self.$firebase.database().ref('message').on('child_removed', snapshot => {
        const index = self.messages.findIndex(message => message.id === snapshot.key)
        if (index >= 0) {
          self.messages.splice(index, 1)
        }
      })
    }
  },
  methods: {
    addMessage () {
      this.$firebase.database().ref('message').push({
        message: this.newMessage
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 400px;
  margin: 10px auto;
}
</style>
