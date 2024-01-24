<template>
  <div>
    <!-- input -->
    <b-form-group id="input-group-2" label="ID:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="user.userId"
        placeholder="Enter ID"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="user.password"
        type="password"
        placeholder="Enter password"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Name:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="user.name"
        placeholder="Enter Name"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Phone:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="user.phone"
        placeholder="Enter Phone"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-1" label="Email:" label-for="input-1">
      <b-form-input id="input-1"
        v-model="user.email"
        type="email"
        placeholder="Enter Email"
        required
      ></b-form-input>
    </b-form-group>

    <!-- validation -->
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <!-- button -->
    <br/>
    <b-button variant="primary" v-on:click="add">Save</b-button>
    <b-button variant="secondary" v-on:click="cancel">Cancel</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user : {
        userId : '',
        password : '',
        name : '',
        phone : '',
        email : ''
      },
      errors : []
    }
  },
  methods: {
    add() {
      if (!this.validation()) return;

      this.$store.dispatch('add', { 'user': this.user });
    },
    validation: function() {
      // todo vee validate
      this.errors = [];

      if (!this.user.userId) {
        this.errors.push('ID required.');
      }
      if (!this.user.password) {
        this.errors.push('password required.');
      }
      if (!this.user.name) {
        this.errors.push('Name required.');
      }
      if (!this.user.phone) {
        this.errors.push('Phone required.');
      }
      if (!this.user.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.user.email)) {
        this.errors.push('Valid email required.');
      }
      if (this.errors.length > 0) return false;

      return true;
    },
    validEmail: function (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    cancel() {
      const currentPage = this.$route.query.currentPage == undefined ? 1 : this.$route.query.currentPage;
      const searchText = this.$route.query.searchText == undefined ? '' : this.$route.query.searchText;
      this.$router.push('/users?currentPage=' + currentPage + '&searchText=' + searchText);
    }
  }
}
</script>

<style scoped>
</style>
