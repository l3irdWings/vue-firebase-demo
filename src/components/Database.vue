<template>
  <div class="database">
    <h1><b>Database</b></h1>
    <b-container>
      <b-row>
        <b-col id="left_col">
          <div id="left_inside_div">
            <img src="./../assets/logo.png">
            <img src="./../assets/firebase.png">
          </div>
        </b-col>
        <b-col id="right_col">
          <div id="right_inside_div">
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'database',
  created () {

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
