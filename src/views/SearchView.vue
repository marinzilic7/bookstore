<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <div class="content">
      <h1 class="text-center mt-5">Search Results</h1>
      <div v-if="books.length" class="book-view d-flex flex-wrap gap-5 ms-5 mt-5">
        <div
          v-for="book in books"
          :key="book.id"
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
        <p class="text-center">No results found.</p>
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
      books: [],
    };
  },
  methods: {
    async searchBooks() {
      try {
        const title = this.$route.query.title;
        const response = await axios.get(
          `http://localhost:3000/api/books/search?title=${title}`
        );
        this.books = response.data;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
  },
  created() {
    this.searchBooks();
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding-bottom: 1rem;
}

.book-view{
  margin-bottom:15vh;
}
</style>
