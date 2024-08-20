<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div class="container">
    <h3 class="text-center mt-4">All books in your cart</h3>
    <div class="mt-3">
      <div class="d-flex flex-column justify-content-center shadow-lg p-5">
        <h3 class="text-center" v-if="carts.items == 0">
          Your cart is empty, please add some books
        </h3>
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
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ item.bookId.title }}</h5>
                <hr />
                <p class="card-text">{{ item.bookId.author }}</p>
                <hr />
                <p class="card-text">{{ item.bookId.category }}</p>
                <hr />
                <p class="card-text">
                  <small class="text-body-secondary"
                    >{{ item.bookId.price }}€</small
                  >
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

        <h3 class="text-end">Total: {{ total }} €</h3>
      </div>
    </div>
  </div>
  <Futer />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carts: [],
      total: 0,
    };
  },
  created() {
    this.fetchCart();
  },
  methods: {
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
        console.log("Ovo je kosarica", this.carts);
        this.total = this.carts.items.reduce(
          (acc, item) => acc + item.bookId.price,
          0
        );
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      console.log(id);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }
        const response = await axios.delete(
          `http://localhost:3000/api/cart/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        this.fetchCart();
      } catch (error) {
        console.error(error);
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
