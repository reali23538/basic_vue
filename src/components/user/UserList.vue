<template>
  <div class="overflow-auto">
    <!-- search, add -->
    <p class="mt-3">
      <b-row class="my-1">
        <b-col sm="3">
          <b-form-input v-model="searchText" v-on:keyup.enter="search" placeholder="UserId, Name"></b-form-input>
        </b-col>
        <b-col sm="3">
          <b-button v-on:click="search">Search</b-button>
          <b-button variant="primary" v-on:click="goAdd">Add</b-button>
        </b-col>
      </b-row>
    </p>

    <div v-if="loading" class="text-center">
      <b-spinner></b-spinner>
    </div>

    <!-- list -->
    <b-table v-if="!loading" striped hover :items="users">
      <template #cell(userId)="data">
        <router-link :to="`/users/${data.item.userSeq}?currentPage=${currentPage}&searchText=${searchText}`">{{ data.value }}</router-link>
      </template>
    </b-table>

    <!-- paging -->
    <div v-if="!loading" class="mt-3">
      <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="rows" @page-click="movePage"></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading : true
    }
  },
  created() {
    const currentPage = this.$route.query.currentPage == undefined ? 1 : this.$route.query.currentPage;
    const searchText = this.$route.query.searchText == undefined ? '' : this.$route.query.searchText;

    const _this = this;
    let req = new Object();
    req.currentPage = currentPage;
    req.searchText = searchText;

    // 로딩보기 위한 딜레이
    setTimeout(()=>{
      this.$store.dispatch('getUsers', { 'request' : req })
      .then(function() {
        _this.loading = false;
      });
    },3000);
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    searchText: {
      get() {
        return this.$store.getters.getSearchText;
      },
      set(val) {
        this.$store.commit('setSearchText', val);
      }
    },
    currentPage() {
      return this.$store.getters.getCurPage;
    },
    perPage() {
      return this.$store.getters.getPerPage;
    },
    rows() {
      return this.$store.getters.getTotRow;
    }
  },
  methods: {
    search() {
      let req = new Object();
      req.currentPage = 1;
      req.searchText = this.searchText;
      this.$store.dispatch('getUsers', { 'request' : req });
    },
    goAdd() {
      this.$router.push('/user/add?currentPage=' + this.currentPage + '&searchText=' + this.$store.getters.getSearchText);
    },
    movePage(button, page) {
      let req = new Object();
      req.currentPage = page;
      req.searchText = this.searchText;
      this.$store.dispatch('getUsers', { 'request' : req });
    }
  }
}
</script>

<style>
</style>
