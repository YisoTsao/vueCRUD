<template>
<div class="ui middle aligned center aligned grid" name="index_title">
  <div class="column">
    <h2 class="ui image header">
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <form action="https://s.codepen.io/voltron2112/debug/PqrEPM?" method="get" class="ui large form">
      <div class="ui stacked secondary  segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input v-model="email" type="text" name="email" placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input v-model="password" type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div class="ui fluid large teal submit button" @click="login" id="submitBTN">Login</div>
      </div>

      <div class="ui error message"></div>

    </form>
    <div class="ui message">
      <a href="/signup">Register</a>
    </div>
  </div>

</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  props: {
    msg: String
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  margin-top: -100px;
}

.column {
  max-width: 450px;
}

[name='index_title'] {
  margin: 0px;
  height: 80vh;
}
</style>
