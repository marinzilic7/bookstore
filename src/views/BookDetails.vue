<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>

  <div class="main d-flex align-items-end">
    <div
      class="main-content d-flex flex-column align-items-center justify-content-center w-100"
    >
      <div class="book-info d-flex">
        <h3 class="text-light">{{ book.title }}</h3>
        <h4 class="text-light text-decoration-underline">{{ book.author }}</h4>
      </div>
    </div>
  </div>
  <div>
    <div
      class="middle-section d-flex justify-content-center gap-5 position-relative flex-wrap"
    >
      <img
        :src="`http://localhost:3000/src/uploads/${book.image}`"
        alt="Book image"
        class="img-fluid"
        height="337px"
        width="336px"
      />
      <div class="items">
        <div class="card" style="width: 18rem">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-center text-muted">
              Description: {{ book.description }}
            </li>
            <li class="list-group-item text-center text-muted">
              Year: {{ book.year }}
            </li>
            <li class="list-group-item text-center text-muted">
              Category: {{ book.category.name }}
            </li>
            <li class="list-group-item text-center text-muted">
              Price: {{ book.price }} €
            </li>
          </ul>
        </div>
        <button class="btn btn-success w-100 mt-2" @click="buyBook(book._id)">
          Buy
        </button>
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
      book: {},
    };
  },
  created() {
    this.fetchBookDetails();
  },
  methods: {
    async fetchBookDetails() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/${id}`
        );
        this.book = response.data;
        console.log(this.book, "Single knjiga");
      } catch (error) {
        console.error("Greška prilikom dohvaćanja detalja knjige:", error);
      }
    },
    async buyBook(id) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const response = await axios.post(
          `http://localhost:3000/api/cart/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Greška prilikom dodavanja knjige u korpu:", error);
      }
    },
  },
};
</script>

<style scoped>
.main {
  height: 40vh;
}

.main-content {
  height: 300px;
  background: linear-gradient(to right, #0d5076, #073251);
}

.book-info {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.book-info h3,
.book-info h4 {
  margin-top: 30px;
  letter-spacing: 5px;
}

.img-fluid {
  position: absolute;
  top: -30%;
  left: 25%;
}

.items {
  margin-top: 50px;
  padding-left: 35px;
  padding-top: 10px;
}

.list-group-item {
  font-size: 16px;
}

.middle-section {
  margin-bottom: 300px;
}
</style>
