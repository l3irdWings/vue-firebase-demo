<template>
  <div class="database">
    <h1><b>Database</b></h1>
    <b-container>
      <b-row>
        <b-col id="left_col">
          <div id="left_inside_div">
            <img src="./../assets/logo.png">
            <img src="./../assets/firebase.png">
            <b-form-input id="new_message_input" v-model="newMessage" required placeholder="Write Comment"></b-form-input>
            <b-button id="new_message_button" v-on:click="addMessage()">Send</b-button>
          </div>
        </b-col>
        <b-col id="right_col">
          <div id="right_inside_div">
            <b-badge v-for="message in messages" v-bind:key="message.id"><h4>{{ message.message | to-uppercase }}</h4></b-badge>
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
        self.messages.push(message)
      })
      observeMessage()
    })

    function observeMessage () {
      self.$firebase.database().ref('message').on('child_added', snapshot => {
        const index = self.messages.findIndex(message => message.id === snapshot.key)
        if (index === -1) {
          let message = snapshot.val()
          message.id = snapshot.key
          self.messages.push(message)
        }
      })

      self.$firebase.database().ref('message').on('child_changed', snapshot => {
        const index = self.messages.findIndex(message => message.id === snapshot.key)
        if (index >= 0) {
          let message = snapshot.val()
          message.id = snapshot.key
          self.messages[index] = message
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
      if (this.newMessage !== '') {
        this.$firebase.database().ref('message').push({
          message: this.newMessage
        })
        this.newMessage = ''
      }
    }
  },
  filters: {
    toUppercase (value) {
      return value.toString().toUpperCase()
    }
  },
  mounted () {
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        this.addMessage()
      }
    })
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
    padding: 10px 10px 0;
  }
  #new_message_input {
    margin-top: 10px;
    height: 50px;
  }
  #new_message_button {
    height: 50px;
    margin-top: 10px;
  }
</style>
