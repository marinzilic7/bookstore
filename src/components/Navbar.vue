<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">BookStore</a>
      
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Books</a>
            </li>
            <ul v-if="!user" class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/register"
                  >Register</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
              </li>
            </ul>

            <div v-else class="dropdown">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user.name }}
                
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" @click="logoutUser()"
                    >Logout</a
                  >
                </li>
                <li v-if="user.role === 'admin'"> <RouterLink class="dropdown-item" to="/admin">Administration</RouterLink> </li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search by title..."
              aria-label="Search"
            />
            <button class="btn btn-outline-dark" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.user = response.data;
        console.log(this.user);
      } catch (error) {
        console.error(
          "Greška prilikom dohvaćanja korisničkih podataka:",
          error
        );
      }
    },
    logoutUser() {
      localStorage.removeItem("token");
      this.user = null;
      this.$router.push("/login");
    },
  },

  created() {
    this.fetchUserData();
  },
};
</script>

<style></style>
