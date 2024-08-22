<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <form class="col-12 col-lg-5 col-md-5 col-sm-5 bg-light shadow-lg p-3" @submit.prevent="loginUser">
        <h2 class="text-center">Login</h2>

        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
        </div>

        <button type="submit" class="button btn btn-primary w-100">Login</button>
        <p class="text-center mt-3">
          You don't have an account?
          <span><a class="color-text" href="/register">Register</a></span>
        </p>
        <p class="color-text text-center"><span><a class="color-text" href="/">Guest</a></span></p>
       
        <p v-if="fail" class="text-danger text-center">
          {{ message }}
        </p>
       
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      alert: false,
      fail: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        localStorage.setItem('token', response.data.token);

        this.message = response.data.message;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        this.$router.push("/");
      } catch (error) {
        this.message = error.response?.data?.message || 'Greška prilikom prijave';
        this.fail = true;
        setTimeout(() => {
          this.fail = false;
        }, 3000);
        console.error("Greška prilikom prijave:", error);
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  background-image: url("../images/background.jpg");
  height: 100vh;
}

.button {
  background-color: #006693;
  border: none;
}

.button:hover {
  background-color: #00587a;
}

.color-text {
  color: #006693;
}

.alert-success {
  color: green;
}

.alert-danger {
  color: red;
}
</style>
