<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <form class="col-12 col-lg-4 col-md-5 col-sm-5 bg-light shadow-lg p-3">
        <h2 class="text-center">Register</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autocomplete="off"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
             autocomplete="off"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
             autocomplete="off"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" class="button btn btn-primary w-100">Register</button>
        <p class="text-center mt-3">You have an account? <span><a class="color-text" href="/login">Login</a></span></p>
        <p class="text-center"><a class="color-text" href="/">Guest</a></p>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style>
.container-fluid {
  background-image: url("../images/background.jpg");
  height: 100vh;
}

.button{
    background-color: #006693;
    border:none;
}

.button:hover{
    background-color: #00587a;
}

.color-text{
    color: #006693;
}
</style>
