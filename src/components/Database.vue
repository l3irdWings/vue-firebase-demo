<template>
  <div class="database">
    <h1><b>Database</b></h1>
    <b-container>
      <b-row>
        <b-col id="input_col">
          <div id="new_message_div">
            <img src="./../assets/logo.png">
            <span>+</span>
            <img src="./../assets/firebase.png">
            <b-form-input id="new_message_input" type="text" v-model="newMessage" required placeholder="Write Comment"></b-form-input>
            <b-button id="new_message_button" v-on:click="addMessage()">Send</b-button>
          </div>
        </b-col>
        <b-col id="output_col">
          <div id="messages_div">
            <b-badge v-for="message in messages" v-bind:key="message['.key']"><h4>{{ message.message }}</h4></b-badge>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'database',
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
      this.newMessage = ''
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  span.badge {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  #input_col {
    position: relative;
    height: 500px;
  }
  #new_message_div {
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    height: 320px;
    margin-top: -160px;
  }
  #new_message_input {
    margin-top: 10px;
    height: 50px;
  }
  #new_message_button {
    height: 50px;
    margin-top: 10px;
  }
  #output_col {
    position: relative;
    height: 500px;
  }
  #messages_div {
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    height: 320px;
    margin-top: -160px;
  }
</style>
