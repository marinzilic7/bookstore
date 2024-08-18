<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <form
        @submit.prevent="registerUser"
        class="col-12 col-lg-4 col-md-5 col-sm-5 bg-light shadow-lg p-3"
      >
        <h2 class="text-center">Register</h2>
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="firstName"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            type="text"
            v-model="surname"
            class="form-control"
            id="lastName"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="email"
            autocomplete="off"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="password"
            required
          />
        </div>
        <button type="submit" class="button btn btn-primary w-100">
          Register
        </button>
        <p class="text-center mt-3">
          You have an account? <a class="color-text" href="/login">Login</a>
        </p>
        <p class="text-center"><a class="color-text" href="/">Guest</a></p>
        <div v-if="alert" class="alert alert-info text-center">
          {{ message }}
        </div>
        <div v-if="fail" class="alert alert-danger text-center">
          {{ message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { set } from "mongoose";

export default {
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      message: "",

      alert: false,
      fail: false,
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            role: "user",
            dateRegistered: new Date(),
          }
        );
        this.message = response.data.message;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        this.emptyFields();
      } catch (error) {
        this.message = error.response.data.message;
        this.fail = true;
        setTimeout(() => {
          this.fail = false;
        }, 3000);
        console.error("Greška prilikom registracije:", error);
      }
    },
    emptyFields() {
      this.name = "";
      this.surname = "";
      this.email = "";
      this.password = "";
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
</style>
