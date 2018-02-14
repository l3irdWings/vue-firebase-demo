<template>
  <div class="firestore">
    <h1><b>Firestore</b></h1>
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
  name: 'firestore',
  created () {

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
