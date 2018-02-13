<template>
  <div class="storage">
    <h1><b>Storage</b></h1>
    <b-container>
      <b-row>
        <b-col id="left_col">
          <div id="left_inside_div">
            <img src="./../assets/logo.png">
            <img src="./../assets/firebase.png">
            <b-form-file id="new_image_input" v-model="newImage" :state="Boolean(newImage)" accept=".jpg, .png" placeholder="Choose a file..."></b-form-file>
            <b-button id="new_image_button" v-on:click="uploadImage()">Upload</b-button>
          </div>
        </b-col>
        <b-col id="right_col">
          <div id="right_inside_div">
            <b-img v-for="image in images" v-bind:key="image.id" v-bind:src="image.url" fluid alt="image" height="100"></b-img>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'storage',
  data () {
    return {
      images: [],
      newImage: null
    }
  },
  created () {
    let self = this
    this.$firebase.database().ref('image').once('value').then(snapshot => {
      snapshot.forEach(function (imageSnapshot) {
        let image = imageSnapshot.val()
        image.id = imageSnapshot.key
        self.images.push(image)
      })
      observeImage()
    })

    function observeImage () {
      self.$firebase.database().ref('image').on('child_added', snapshot => {
        const index = self.images.findIndex(image => image.id === snapshot.key)
        if (index === -1) {
          let image = snapshot.val()
          image.id = snapshot.key
          self.images.push(image)
        }
      })

      self.$firebase.database().ref('image').on('child_removed', snapshot => {
        const index = self.images.findIndex(image => image.id === snapshot.key)
        if (index >= 0) {
          let image = snapshot.val()
          self.$firebase.storage().refFromURL(image.storage_location).delete().then(function () {
            self.images.splice(index, 1)
          })
        }
      })
    }
  },
  methods: {
    uploadImage () {
      let self = this
      let task = this.$firebase.storage().ref(`/image/${this.newImage.name}`).put(this.newImage)
      task.on('state_changed',
        function progress (snapshot) {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${percentage}% done`)
        },
        function error (err) {
          console.log(err)
        },
        function complete () {
          console.log('complete upload')
          // Upload completed successfully, now we can get the download URL
          const storageLocation = `gs://${self.$firebase.storage().ref().bucket}/image/${self.newImage.name}`
          self.$firebase.storage().refFromURL(storageLocation).getDownloadURL().then(url => {
            self.$firebase.database().ref('image').push({
              storage_location: storageLocation,
              url: url
            })
          })
        }
      )
    }
  }
}
</script>

<style scoped>
  #new_image_input {
    margin-top: 10px;
    height: 50px;
  }
  #new_image_button {
    height: 50px;
    margin-top: 10px;
  }
</style>
