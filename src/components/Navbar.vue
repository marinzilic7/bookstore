<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="../images/logoo.png" height="80px"  alt="logo" srcset=""></a>

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
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/books">Books</RouterLink>
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
                <li v-if="user.role === 'admin'">
                  <RouterLink class="dropdown-item" to="/admin"
                    >Administration</RouterLink
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logoutUser()"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </ul>
          <ul class="navbar-nav ms-auto me-3 mb-2 mb-lg-0 position-relative">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/cart"
                ><i class="bi bi-cart fs-4"></i
              ></RouterLink>
            </li>
            <span
              v-if="carts && carts.items && carts.items.length > 0"
              class="badge-color position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill bg-primary"
            >
              {{ carts.items.length }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </ul>
          <form class="d-flex" role="search"  @submit.prevent="searchBooks">
            <input
              v-model="searchQuery"
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
      carts: [],
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
    async fetchCart() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.carts = response.data;

        this.total = this.carts.items.reduce(
          (acc, item) => acc + item.bookId.price,
          0
        );
      } catch (error) {
        console.error(error);
      }
    },
    searchBooks() {
      this.$router.push({ path: '/search', query: { title: this.searchQuery } });
    },
  },

  created() {
    this.fetchUserData();
    this.fetchCart();
    this.$bus.on("cart-updated", this.fetchCart);
    
  },
  beforeUnmount() {
    this.$bus.off("cart-updated", this.fetchCart);
   
  },
};
</script>

<style>
.badge-color {
  background-color: #00587a !important;
}
</style>
