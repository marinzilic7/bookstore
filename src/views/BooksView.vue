<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div v-if="books.length > 0" class="book-view d-flex flex-wrap gap-5 ms-5 mt-5">
    <div
      v-for="book in books"
      :key="book._id"
      class="card border-0"
      style="width: 180px"
    >
      <RouterLink :to="{ name: 'BookDetails', params: { id: book._id } }">
        <img
          :src="'./src/uploads/' + book.image"
          alt="Book image"
          class="img-fluid"
          height="240px"
          width="180px"
        />
      </RouterLink>

      <div class="card-body mt-3">
        <p class="book-title card-text">
          {{ book.title }}
        </p>
        <p class="book-title text-muted">
          {{ book.author }}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <h3 class="text-center mt-5">There is no currently books here.</h3>
  </div>
  <Futer v-if="!books.length"  class="position-fixed bottom-0 w-100"/>
  <Futer v-else /> 
  <Futer />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      search: "",
    };
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const token = localStorage.getItem("token");
       

        const response = await axios.get("http://localhost:3000/api/books", {
          
        });

        this.books = response.data;
        console.log("Ovo su sve knjige:", this.books);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja knjiga:", error);
      }
    },
  },
};
</script>

<style scoped>
.book-title {
  font-size: 18.08px;
  line-height: 10px;
}

.card-body {
  padding: 0px;
}

.img-fluid {
  border-radius: 10px;
  transition: transform 0.5s;
  cursor: pointer;
}

.img-fluid:hover {
  transform: translateY(-10px);
}

.book-view{
  margin-bottom:15vh;
}
</style>
