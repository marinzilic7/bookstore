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
            Placeholder content for this accordion, which is intended to
            demonstrate the <code>.accordion-flush</code> class. This is the
            third item's accordion body. Nothing more exciting happening here in
            terms of content, but just filling up the space to make it look, at
            least at first glance, a bit more representative of how this would
            look in a real-world application.
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
                  <tr
                    class="table-items"
                    v-for="category in categories"
                    :key="category._id"
                  >
                    <th class="text-center text-muted" scope="row">
                      {{ category._id }}
                    </th>
                    <td class="text-center text-muted">{{ category.name }}</td>
                    <td class="text-center text-muted" >
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
                        title="Delete user"
                      ></i>
                    </td>
                    <td class="text-center">
                      <i
                        class="deleteUserIcon bi bi-pencil-square text-primary fs-5"
                        title="Edit category"
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
          "Jeste li sigurni da želite obrisati ovog korisnika?"
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
        // Clear input field
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
  },

  created() {
    this.fetchUserData();
    this.fetchCategories();
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
