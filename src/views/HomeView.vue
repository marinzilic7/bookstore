<script setup>
import Navbar from "@/components/Navbar.vue";
import Futer from "@/components/Futer.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div class="container">
    
    
    <div class="d-flex align-items-center justify-content-evenly mt-5">
      <div class="mb-5">
        <h1 class="heading">
          Free ebooks, audiobooks & <br />
          magazines from your library
        </h1>
        <p class="text-muted">
          All you need is a public library card or access through your <br />
          workplace or university. Always free - no fees or subscriptions.
        </p>
        <div class="d-flex align-items-center mt-5">
          <img src="../images/download.png" alt="logo-app" />
          <div>
            <h1>LibbyApp</h1>
            <p>The library reading app</p>
          </div>
        </div>
        <button class="libby-button btn btn-primary mt-5 w-75 p-2">
          Get started with Libby today ->
        </button>
      </div>
      <img
        src="../images/homeImage.png"
        alt="homeImage"
        srcset=""
        height="500px"
        width="500px"
      />
    </div>
    <div class="mt-5">
      <div class="d-flex justify-content-center gap-5">
        <div>
          <img src="../images/kanopy-logo.png" height="80px" alt="" srcset="" />
          <h2 class="mt-3">kanopy</h2>
          <p class="text-muted">
            Stream movies anywhere <br />
            Thousands of films for free, thanks to your <br />
            public library or university.
          </p>
          <p class="desc-text fw-bold">Learn more about Kanopy -></p>
        </div>
        <div>
          <img src="../images/sora-logo.png" height="80px" alt="" />
          <h2 class="mt-3">Sora</h2>
          <p class="text-muted">
            K-12 student reading <br />
            Getting ebooks and audiobooks from your school <br />
            is quick and easy with Sora.
          </p>
          <p class="desc-text fw-bold">Learn more about Sora -></p>
        </div>
        <div>
          <img src="../images/tb-logo.png" height="80px" alt="" />
          <h2 class="mt-3">TeachingBooks</h2>
          <p class="text-muted">
            Bring books to life <br />
            Discover materials to enrich the reading <br />
            experience of children's and teen books.
          </p>
          <p class="desc-text fw-bold">Learn more about TeachingBooks</p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="middle-section mt-5 d-flex align-items-center justify-content-center"
  >
    <div>
      <div class="container">
        <div class="d-flex justify-content-center gap-5 align-items-center">
          <div>
            <h1 class="heading-2 text-light">
              Explore & read milions of <br />
              books online for free
            </h1>
            <button class="collection-text btn btn-primary p-3 mt-4">
              Browse our collection
            </button>
          </div>
          <div class="image-books d-flex gap-3">
            <img src="../images/kate.png" alt="" height="221px" />
            <img src="../images/daniel.png" alt="" height="221px" />
            <img src="../images/sullivan.png" alt="" height="221px" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="text-center mt-5">
      <h4 class="desc-text fw-bold">The New York Times Best Sellers</h4>
      <h5>
        The NYT best selling fiction and nonfiction books - August 18, 2024
      </h5>
    </div>
    <hr />
    <div class="book-items d-flex justify-content-evenly mt-5">
      <div>
        <img src="../images/women.png" alt="slika" height="240px" />
        <p class="desc-text mt-3">The Women</p>
        <p class="text-muted">
          Kristin Hannah Julia <br />
          Whelan (2024)
        </p>
      </div>
      <div>
        <img src="../images/roses.png" alt="slika" height="240px" />
        <p class="desc-text mt-3">
          A Court of Thorns and <br />
          Roses
        </p>
        <p class="text-muted">Sarah J.Maas (2015)</p>
      </div>
      <div>
        <img src="../images/summer.png" alt="slika" height="240px" />
        <p class="desc-text mt-3">Just for the Summer</p>
        <p class="text-muted">
          Abby Jimenez <br />
          Christine Lakin (2024)
        </p>
      </div>
      <div>
        <img src="../images/elegy.png" alt="slika" height="240px" />
        <p class="desc-text mt-3">Hillbilly Elegy</p>
        <p class="text-muted">J.D.Vance (2016)</p>
      </div>
      <div>
        <img src="../images/fourth.png" alt="slika" height="240px" />
        <p class="desc-text mt-3">Fourth Wing</p>
        <p class="text-muted">Rebecca Yarros (2023)</p>
      </div>
      <div>
        <img src="../images/ends.png" alt="slika" height="240px" />
        <p class="desc-text mt-3">It Ends With Us</p>
        <p class="text-muted">Colleen Hoover (2016)</p>
      </div>
    </div>
  </div>
  <Futer />
</template>

<script>

</script>

<style scoped>
.libby-button {
  background-color: #006693;
  border: none;
}

.heading {
  font-size: 48px;
}

.heading-2 {
  font-size: 43px;
}

.desc-text {
  color: #006693;
}

.collection-text {
  background-color: #ce3e28;
  border: none;
}

.middle-section {
  background-color: rgb(0, 102, 147);
  height: 500px;
}

.image-books img {
  transition: transform 0.5s;
}

.image-books img:hover {
  transform: scale(1.1);
}

.book-items {
  margin-bottom: 100px !important;
}
.book-items img {
  transition: transform 0.5s;
  cursor: pointer;
}

.book-items img:hover {
  transform: scale(1.1);
}
</style>
