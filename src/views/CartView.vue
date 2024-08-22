<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div>
    <Navbar />
    <div
      v-if="success"
      class="alert alert-info position-fixed mt-3 me-3 end-0 z-3"
    >
      {{ noti }}
    </div>
    <div class="container">
      <h3 class="text-center mt-4">All books in your cart</h3>
      <div class="mt-3">
        <div class="d-flex flex-column justify-content-center shadow-lg p-5">
          <!-- Poruka za prijavu -->
          <div v-if="!user">
            <h3 class="text-center text-danger">
              Login to be able to add to the cart
            </h3>
          </div>

          <!-- Poruka za praznu košaricu -->
          <h3 class="text-center" v-if="user && carts.items.length == 0">
            Your cart is empty, please add some books
          </h3>

          <!-- Košarica -->
          <div
            v-else
            v-for="item in carts.items"
            :key="item._id"
            class="card mt-5 shadow-lg mb-3 col-12"
            style="max-width: 680px"
          >
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="`http://localhost:3000/src/uploads/${item.bookId.image}`"
                  class="img-fluid rounded-start"
                  alt="Book image"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Title: {{ item.bookId.title }}</h5>
                  <hr />
                  <p class="card-text">Author: {{ item.bookId.author }}</p>
                  <hr />
                  <p class="card-text">Year: {{ item.bookId.year }}</p>
                  <hr />
                  <p class="card-text">Quantity: {{ item.quantity }}</p>
                  <hr />
                  <p class="card-text">
                    <small class="text-body-secondary">
                      Price: {{ price }}€
                    </small>
                  </p>
                  <hr />
                  <div class="d-flex justify-content-end me-3">
                    <i
                      class="delete-cart-icon bi bi-x-circle text-danger fs-4 mt-1"
                      @click="deleteItem(item.bookId._id)"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ukupna cijena i dugme za plačanje -->
          <h3 class="text-end">Total: {{ total }} €</h3>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Go to payment
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal za plačanje -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Payment</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row g-3" @submit.prevent="goToPay()">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  v-model="firstName"
                />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPassword4"
                  v-model="lastName"
                />
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  v-model="address"
                />
              </div>

              <div class="col-12">
                <label for="inputCity" class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  v-model="city"
                />
              </div>

              <button type="submit" class="btn btn-success">Confirm</button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary w-100"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <Futer />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carts: [],
      total: 0,
      price: null,
      user: null,
      noti: "",
      success: false,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
    };
  },
  created() {
    this.fetchCart();
    this.fetchUserData();
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
      } catch (error) {
        console.error(
          "Greška prilikom dohvaćanja korisničkih podataka:",
          error
        );
      }
    },
    async fetchCart() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.noti = "You need to be logged in to buy a book";
          this.success = true;
          return;
        }
        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.carts = response.data;

        // Racunanje ukupne cijene na osnovu kolicine
        this.price = this.carts.items.reduce((total, item) => {
          return total + item.bookId.price * item.quantity;
        }, 0);
        this.total = this.price;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }
        await axios.delete(`http://localhost:3000/api/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$bus.emit("cart-updated");
        this.fetchCart();
      } catch (error) {
        console.error(error);
      }
    },
  
    async goToPay() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.noti = "You need to be logged in to buy a book";
          this.success = true;
          return;
        }
        const response = await axios.post(
          "http://localhost:3000/api/order",
          {
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            city: this.city,
            cartId: this.carts._id,
            total: this.total,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.success = true;
        this.noti = "Order received";
        setTimeout(() => {
          this.success = false;
        }, 2000);
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        
        modal.hide();
        this.$bus.emit("cart-updated");
        console.log(response.data);
        
      } catch (error) {
        console.error("Greška prilikom plaćanja:", error);
      }
    },
  },
};
</script>

<style scoped>
.delete-cart-icon {
  cursor: pointer;
}

.container {
  margin-bottom: 30vh;
}
</style>
