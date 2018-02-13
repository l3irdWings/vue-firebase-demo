<template>
  <div class="firestore">
    <h1><b>Firestore</b></h1>
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
  name: 'firestore',
  data () {
    return {
      messages: [],
      newMessage: ''
    }
  },
  created () {
    let self = this

    this.$firebase.firestore().collection('message').get().then(snapshot => {
      snapshot.forEach(function (messageDoc) {
        let message = messageDoc.data()
        message.id = messageDoc.id
        self.messages.push(message)
      })
      observeMessage()
    })

    function observeMessage () {
      self.$firebase.firestore().collection('message').onSnapshot(snapshot => {
        snapshot.docChanges.forEach(function (change) {
          const index = self.messages.findIndex(message => message.id === change.doc.id)

          if (change.type === 'added' && index === -1) {
            let message = change.doc.data()
            message.id = change.doc.id
            self.messages.push(message)
          }
          if (change.type === 'modified' && index >= 0) {
            let message = change.doc.data()
            message.id = change.doc.id
            self.messages[index] = message
          }
          if (change.type === 'removed' && index >= 0) {
            self.messages.splice(index, 1)
          }
        })
      })
    }
  },
  methods: {
    addMessage () {
      if (this.newMessage !== '') {
        this.$firebase.firestore().collection('message').add({
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
