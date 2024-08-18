<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div v-if="user.role !== 'admin'">
    <h1>Forbidden</h1>
    <p>You don't have permission to access this page.</p>
  </div>
  <div v-else class="container">
    <div
      v-if="success"
      class="alert alert-info position-absolute mt-3 me-3 end-0"
    >
      {{ message }}
    </div>
    <h1 class="text-center mt-5">Admin panel</h1>

    <div
      class="accordion accordion-flush shadow-sm mt-5"
      id="accordionFlushExample"
    >
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Overview of all users in the database
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-sm">
                <thead>
                  <tr class="table-items">
                    <th scope="col" class="text-center">ID</th>
                    <th scope="col" class="text-center">First Name</th>
                    <th scope="col" class="text-center">Last Name</th>
                    <th scope="col" class="text-center">Email address</th>
                    <th scope="col" class="text-center">Role</th>
                    <th scope="col" class="text-center">
                      Date of registration
                    </th>
                    <th scope="col" class="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-items" v-for="user in users" :key="user._id">
                    <th class="text-center text-muted">{{ user._id }}</th>
                    <td class="text-center text-muted">{{ user.name }}</td>
                    <td class="text-center text-muted">{{ user.surname }}</td>
                    <td class="text-center text-muted">{{ user.email }}</td>
                    <td class="text-center text-muted">{{ user.role }}</td>
                    <td class="text-center text-muted">
                      {{ formatDate(user.dateRegistered) }}
                    </td>
                    <td class="text-center">
                      <i
                        class="deleteUserIcon bi bi-file-earmark-x text-danger fs-5"
                        title="Delete user"
                        @click="deleteUser(user._id)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            Overview of all categories / Manipulation of categories
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <h5 class="text-center mt-3">Add new category</h5>
            <form @submit.prevent="addCategory()">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1">Category</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type name of category..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  v-model="newCategoryName"
                />
              </div>
              <div class="d-flex justify-content-end gap-3">
                <button type="submit" class="button btn text-light btn-sm">
                  Add category
                </button>
                <button
                  class="button btn text-light btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  See all categories
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            View all books / Manipulation of books
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            <h5 class="text-center mt-3">Add new book</h5>
            <form @submit.prevent="addBook()">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1">Title</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter the title of the book..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  v-model="bookTitle"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1">Author</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter the author's name..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  v-model="author"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1">Year</span>
                <input
                  type="number"
                  class="form-control"
                  placeholder="The year of the book"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  v-model="year"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1"
                  >Description</span
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter the description of the book..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  v-model="description"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1">Price</span>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter the price of the book..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                  v-model="price"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1">Category</span>
                <select
                  class="form-control"
                  aria-label="Category"
                  v-model="selectedCategory"
                  required
                >
                  <option value="" disabled selected>Select category...</option>
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="basic-addon1"
                  >Book Image</span
                >
                <input
                  type="file"
                  class="form-control"
                  aria-label="Book Image"
                  aria-describedby="basic-addon1"
                  @change="handleFileUpload"
                />
              </div>
              <div class="d-flex justify-content-end gap-3">
                <button type="submit" class="button btn text-light btn-sm">
                  Add Book
                </button>
                <button
                  class="button btn text-light btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#bookModal"
                  data-bs-whatever="@mdo"
                >
                  See all books
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL -->

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              All categories in database
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-hover">
                <thead>
                  <tr class="table-items">
                    <th class="text-center" scope="col">ID</th>
                    <th class="text-center" scope="col">Category Name</th>
                    <th class="text-center" scope="col">Added by</th>
                    <th class="text-center" scope="col">Date</th>
                    <th class="text-center" scope="col">Update Date</th>
                    <th class="text-center" scope="col">Delete</th>
                    <th class="text-center" scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="categories.length === 0">
                    <td colspan="7" class="text-center fs-4 mt-3 mb-3">
                      There are currently no categories.
                    </td>
                  </tr>
                  <tr
                    v-else
                    class="table-items"
                    v-for="category in categories"
                    :key="category._id"
                  >
                    <th class="text-center text-muted" scope="row">
                      {{ category._id }}
                    </th>
                    <td class="text-center text-muted">{{ category.name }}</td>
                    <td class="text-center text-muted">
                      {{ category.createdBy.name }}
                      {{ category.createdBy.surname }}
                    </td>
                    <td class="text-center text-muted">
                      {{ formatDate(category.createdAt) }}
                    </td>

                    <td
                      v-if="category.updatedAt === category.createdAt"
                      class="text-center text-muted"
                    >
                      Not updated yet
                    </td>
                    <td v-else class="text-center text-muted">
                      {{ formatDate(category.updatedAt) }}
                    </td>
                    <td class="text-center">
                      <i
                        class="deleteUserIcon bi bi-file-earmark-x text-danger fs-5"
                        title="Delete category"
                        @click="deleteCategory(category._id)"
                      ></i>
                    </td>
                    <td class="text-center">
                      <i
                        class="deleteUserIcon bi bi-pencil-square text-primary fs-5"
                        title="Edit category"
                        @click="openEditCategoryModal(category)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table for books - modal  -->

    <div
      class="modal fade"
      id="bookModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              All books in database
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-hover">
                <thead>
                  <tr class="table-items">
                    <th class="text-center" scope="col">ID</th>
                    <th class="text-center" scope="col">Title</th>
                    <th class="text-center" scope="col">Added by</th>
                    <th class="text-center" scope="col">Author</th>
                    <th class="text-center" scope="col">Year</th>
                    <th class="text-center" scope="col">Description</th>
                    <th class="text-center" scope="col">Price</th>
                    <th class="text-center" scope="col">Category</th>
                    <th class="text-center" scope="col">Image</th>
                    <th class="text-center" scope="col">Date</th>
                    <th class="text-center" scope="col">Update Date</th>
                    <th class="text-center" scope="col">Delete</th>
                    <th class="text-center" scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="books.length === 0">
                    <td colspan="13" class="text-center fs-4 mt-3 mb-3">
                      There are currently no books.
                    </td>
                  </tr>
                  <tr
                    v-else
                    class="table-items"
                    v-for="book in books"
                    :key="book._id"
                  >
                    <th class="text-center text-muted" scope="row">
                      {{ book._id }}
                    </th>
                    <td class="text-center text-muted">{{ book.title }}</td>
                    <td class="text-center text-muted">
                      {{ book.addedBy.name }}
                      {{ book.addedBy.surname }}
                    </td>
                    <td class="text-center text-muted">{{ book.author }}</td>
                    <td class="text-center text-muted">{{ book.year }}</td>
                    <td class="text-center text-muted">
                      {{ book.description }}
                    </td>
                    <td class="text-center text-muted">{{ book.price }} €</td>
                    <td class="text-center text-muted">
                      {{ book.category.name }}
                    </td>
                    <td class="text-center text-muted">
                      <img
                        :src="'./src/uploads/' + book.image"
                        alt="Book image"
                        class="img-fluid"
                        height="30px"
                        width="30px"
                      />
                    </td>
                    <td class="text-center text-muted">
                      {{ formatDate(book.createdAt) }}
                    </td>
                    <td
                      v-if="book.updatedAt === book.createdAt"
                      class="text-center text-muted"
                    >
                      Not updated yet
                    </td>
                    <td v-else class="text-center text-muted">
                      {{ formatDate(book.updatedAt) }}
                    </td>
                    <td class="text-center">
                      <i
                        class="deleteUserIcon bi bi-file-earmark-x text-danger fs-5"
                        title="Delete book"
                        @click="deleteBook(book._id)"
                      ></i>
                    </td>
                    <td class="text-center">
                      <i
                        class="deleteUserIcon bi bi-pencil-square text-primary fs-5"
                        title="Edit book"
                        @click="openEditBookModal(book)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editCategoryModal"
      tabindex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editCategoryModalLabel">
              Edit Category
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCategory">
              <div class="mb-3">
                <label for="categoryName" class="form-label"
                  >Category Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  v-model="editCategoryName"
                  required
                />
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FOR EDITING BOOK -->

    <div
      class="modal fade"
      id="editBookModal"
      tabindex="-1"
      aria-labelledby="editBookModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editBookModalLabel">Edit Book</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateBook">
              <div class="mb-3">
                <label for="editBookTitle" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="editBookTitle"
                  v-model="editBookTitle"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editBookAuthor" class="form-label">Author</label>
                <input
                  type="text"
                  class="form-control"
                  id="editBookAuthor"
                  v-model="editBookAuthor"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editBookYear" class="form-label">Year</label>
                <input
                  type="number"
                  class="form-control"
                  id="editBookYear"
                  v-model="editBookYear"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editBookDescription" class="form-label"
                  >Description</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="editBookDescription"
                  v-model="editBookDescription"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editBookPrice" class="form-label">Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="editBookPrice"
                  v-model="editBookPrice"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editBookCategory" class="form-label"
                  >Category</label
                >
                <select
                  class="form-control"
                  id="editBookCategory"
                  v-model="editBookCategory"
                  required
                >
                  <option value="" disabled selected>Select category...</option>
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editBookImage" class="form-label">Book Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="editBookImage"
                  @change="handleFileUpload"
                />
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { format } from "date-fns";

export default {
  data() {
    return {
      user: null,
      users: [],
      newCategoryName: "",
      message: "",
      success: false,
      categories: [],
      editCategoryId: null,
      editCategoryName: "",
      bookTitle: "",
      year: "",
      description: "",
      price: "",
      author: "",
      selectedCategory: "",
      imageFile: null,
      books: [],
      editBookId: null,
      editBookTitle: "",
      editBookAuthor: "",
      editBookYear: "",
      editBookDescription: "",
      editBookPrice: "",
      editBookCategory: "",
      editBookImage: null,
    };
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
        console.log(this.user);

        if (this.user.role === "admin") {
          const usersResponse = await axios.get(
            "http://localhost:3000/api/users",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          this.users = usersResponse.data;
          console.log("Ovo je list svih korisnika:", this.users);
        }
      } catch (error) {
        console.error(
          "Greška prilikom dohvaćanja korisničkih podataka:",
          error
        );
      }
    },
    formatDate(date) {
      return format(new Date(date), "dd.MM.yyyy. HH:mm:ss"); // Primjer formata datuma i vremena
    },
    async deleteUser(id) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const confirmDelete = confirm(
          "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;

        const response = await axios.delete(
          `http://localhost:3000/api/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Provjeri odgovor
        console.log("Response from server:", response);

        // Ažuriraj listu korisnika nakon brisanja
        this.users = this.users.filter((user) => user._id !== id);
        console.log("Korisnik uspješno obrisan:", id);
      } catch (error) {
        console.error(
          "Greška prilikom brisanja korisnika:",
          error.response || error.message
        );
      }
    },
    async addCategory() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/api/categories",
          {
            name: this.newCategoryName,
            userId: this.user._id, // Send user ID who adds the category
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Category added:", response.data);
        this.success = true;
        this.message = response.data.message;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        this.fetchCategories();
        this.newCategoryName = "";
      } catch (error) {
        this.success = true;
        this.message = error.response.data.message;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        console.error(
          "Error adding category:",
          error.response || error.message
        );
      }
    },
    async fetchCategories() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.categories = response.data;
        console.log("Ovo su sve kategorije:", this.categories);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja kategorija:", error);
      }
    },
    async deleteCategory(id) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const confirmDelete = confirm(
          "Are you sure you want to delete this category??"
        );
        if (!confirmDelete) return;

        const response = await axios.delete(
          `http://localhost:3000/api/categories/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Category deleted:", response.data);
        this.categories = this.categories.filter(
          (category) => category._id !== id
        );
      } catch (error) {
        console.error("Greška prilikom brisanja kategorije:", error);
      }
    },
    openEditCategoryModal(category) {
      this.editCategoryId = category._id;
      this.editCategoryName = category.name;
      const modal = new bootstrap.Modal(
        document.getElementById("editCategoryModal")
      );
      modal.show();
    },
    async openEditBookModal(book) {
      this.editBookId = book._id;
      this.editBookTitle = book.title;
      this.editBookAuthor = book.author;
      this.editBookYear = book.year;
      this.editBookDescription = book.description;
      this.editBookPrice = book.price;
      this.editBookCategory = book.category._id; // Adjust if necessary
      const modal = new bootstrap.Modal(
        document.getElementById("editBookModal")
      );
      modal.show();
    },
    async updateBook() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const formData = new FormData();
        formData.append("title", this.editBookTitle);
        formData.append("author", this.editBookAuthor);
        formData.append("year", this.editBookYear);
        formData.append("description", this.editBookDescription);
        formData.append("price", this.editBookPrice);
        formData.append("category", this.editBookCategory);
        if (this.imageFile) {
          formData.append("image", this.imageFile);
        }

        const response = await axios.put(
          `http://localhost:3000/api/books/${this.editBookId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Book updated:", response.data);
        this.fetchBooks();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("editBookModal")
        );
        modal.hide();
      } catch (error) {
        console.error("Error updating book:", error.response || error.message);
      }
    },
    async updateCategory() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const response = await axios.put(
          `http://localhost:3000/api/categories/${this.editCategoryId}`,
          {
            name: this.editCategoryName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Category updated:", response.data);
        this.success = true;
        this.message = response.data.message;
        setTimeout(() => {
          this.success = false;
        }, 3000);

        // Ažuriraj lokalnu listu kategorija
        this.categories = this.categories.map((category) =>
          category._id === this.editCategoryId
            ? { ...category, name: this.editCategoryName }
            : category
        );

        // Sakrij modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("editCategoryModal")
        );
        modal.hide();
        this.fetchCategories();
      } catch (error) {
        this.success = true;
        this.message = error.response.data.message;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        console.error(
          "Error updating category:",
          error.response || error.message
        );
      }
    },
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
    },
    async addBook() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }
        console.log("User ID:", this.user._id);
        const formData = new FormData();
        formData.append("title", this.bookTitle);
        formData.append("author", this.author);
        formData.append("year", this.year);
        formData.append("description", this.description);
        formData.append("price", this.price);
        formData.append("category", this.selectedCategory);
        formData.append("addedBy", this.user._id);
        if (this.imageFile) {
          formData.append("image", this.imageFile);
        }

        const response = await axios.post(
          "http://localhost:3000/api/books",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Book added:", response.data);
        this.success = true;
        this.message = response.data.message;
        this.fetchBooks();
        setTimeout(() => {
          this.success = false;
        }, 3000);
        this.bookTitle = "";
        this.author = "";
        this.year = "";
        this.description = "";
        this.price = "";
        this.selectedCategory = "";
        this.imageFile = null;
      } catch (error) {
        this.success = true;
        this.message = error.response.data.message;
        setTimeout(() => {
          this.success = false;
        }, 3000);
        console.error(
          "Greška prilikom dodavanja knjige:",
          error.response || error.message
        );
      }
    },
    async fetchBooks() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.books = response.data;
        console.log("Ovo su sve knjige:", this.books);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja knjiga:", error);
      }
    },
    async deleteBook(id) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Nema tokena, korisnik nije prijavljen");
          return;
        }

        const confirmDelete = confirm(
          "Are you sure you want to delete this book?"
        );
        if (!confirmDelete) return;

        const response = await axios.delete(
          `http://localhost:3000/api/books/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Provjeri odgovor
        console.log("Response from server:", response);

        // Ažuriraj listu knjiga nakon brisanja
        this.books = this.books.filter((book) => book._id !== id);
        console.log("Knjiga uspješno obrisana:", id);
        this.fetchBooks();
      } catch (error) {
        console.error(
          "Greška prilikom brisanja knjige:",
          error.response || error.message
        );
      }
    },
  },

  created() {
    this.fetchUserData();
    this.fetchCategories();
    this.fetchBooks();
  },
};
</script>

<style>
.deleteUserIcon {
  cursor: pointer;
}

.button {
  background-color: #006693;
  border: none;
}

.button:hover {
  background-color: #00587a;
}
</style>
