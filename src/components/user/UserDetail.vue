<template>
  <div>
    <input type="hidden" v-model="user.userId" />

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

    <!-- button area -->
    <br/>
    <b-button variant="primary" v-on:click="edit(user)">Save</b-button>
    <b-button variant="danger" v-on:click="remove(user.userId)">Delete</b-button>
    <b-button variant="secondary" v-on:click="cancel">Cancel</b-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      listUrl : ''
    }
  },
  created() {
    const seq = this.$route.params.seq;
    this.$store.dispatch('getUser', { 'seq' : seq });

    // list url 세팅
    const currentPage = this.$route.query.currentPage == undefined ? 1 : this.$route.query.currentPage;
    const searchText = this.$route.query.searchText == undefined ? '' : this.$route.query.searchText;
    this.listUrl = '/users?currentPage=' + currentPage + '&searchText=' + searchText;
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    edit(user) {
      const _this = this;
      this.$store.dispatch('edit', { 'user': user })
        .then(function() {
          alert('saved');
          _this.$router.push(_this.listUrl);
        });
    },
    remove(userId) {
      if (!confirm('삭제하시겠습니까?')) return;

      const _this = this;
      this.$store.dispatch('remove', { 'userId': userId })
        .then(function() {
          alert('deleted');
          _this.$router.push(_this.listUrl);
        });
    },
    cancel() {
      this.$router.push(this.listUrl);
    }
  }
}
</script>

<style scoped>
</style>
