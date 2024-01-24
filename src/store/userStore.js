import axios from "axios";

const API_URL = 'http://localhost:8081';

const userStore = {
  state: {
    users: [],
    user: null, // userId, name, phone, email
    searchText: '',
    currentPage: 1,
    perPage: 10,
    totalRows: 0
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setSearchText(state, searchText) {
      state.searchText = searchText;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setPerPage(state, perPage) {
      state.perPage = perPage;
    },
    setTotalRows(state, totalRows) {
      state.totalRows = totalRows;
    }
  },
  actions: {
     getUsers({ state, commit }, { request }){
       axios.get(API_URL + '/users?currentPage=' + request.currentPage + '&searchText=' + request.searchText)
         .then((response) => {
           commit("setUsers", response.data.users);
           // 검색, 페이징 정보 세팅
           commit('setSearchText', request.searchText);
           commit('setCurrentPage', request.currentPage);
           commit('setPerPage', response.data.rowCntPerPage);
           commit('setTotalRows', response.data.totalCount);
         })
         .catch((error) => {
           console.log(error);
         });
    },
    getUser ({ state, commit }, { seq }) {
      axios.get(API_URL + '/users/' + seq)
        .then(function (response) {
          commit('setUser', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    add ({ state, commit }, { user }) {
      axios.post(API_URL + '/user', user)
        .then(function (response) {
          alert('saved');
          location.href = '/users';
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    edit ({ state, commit }, { user }) {
      axios.put(API_URL + '/user', user)
        .then(function (response) {
          // commit('setUser', response.data);
        })
        .catch(function (error) {
          console.log(error);
          alert('fail');
        });
    },
    remove ({ state, commit }, { userId }) {
      axios.delete(API_URL + '/users/' + userId)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getUser(state) {
      return state.user;
    },
    getSearchText(state) {
      return state.searchText;
    },
    getCurPage(state) {
      return state.currentPage;
    },
    getTotRow(state) {
      return state.totalRows;
    },
    getPerPage(state) {
      return state.perPage;
    }
  }
}

export default userStore;
