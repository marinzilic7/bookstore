<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div
      v-if="success"
      class="alert alert-info position-fixed mt-3 me-3 end-0 z-3"
    >
      {{ noti }}
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
      class="middle-section d-flex justify-content-center gap-5  flex-wrap"
    >
      <img
        :src="`http://localhost:3000/src/uploads/${book.image}`"
        alt="Book image"
        class="img-fluid mt-5"
        height="337px"
        width="336px"
      />
      <div class="items">
        <div class="card " style="width: 18rem">
          <ul class="list-group list-group-flush">
            
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
        <button class="btn btn-success w-100  btn-sm mt-2" @click="buyBook(book._id)">
          Buy
        </button>
        <p class="text-desc mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta vero in nulla nostrum tempora recusandae sint praesentium numquam enim magni et, voluptates facere esse nihil rem iste doloremque? Labore facilis harum laudantium rem fugiat eveniet molestiae maiores quae voluptatum cum quibusdam at quisquam tempora corrupti beatae nisi perspiciatis quam tempore perferendis, ea doloremque alias! Laudantium tempora mollitia placeat aspernatur!</p>
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
      noti: "",
      success: false,
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
          this.noti	= "You need to be logged in to buy a book";
          this.success = true;
          return;
        }

        const response = await axios.post(
          `http://localhost:3000/api/cart/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.success = true;
        this.noti = response.data.message;
        setTimeout(() => {
         this.success = false;
          
        }, 2000);
        this.$bus.emit('cart-updated');
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

.text-desc{
  width:290px;
}
</style>
