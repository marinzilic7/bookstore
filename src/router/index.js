import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import BooksView from '../views/BooksView.vue'
import AdminView from '../views/AdminView.vue'
import BookDetails from "../views/BookDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: "/book/:id", 
      name: "BookDetails",
      component: BookDetails,
    },
  ]
})

export default router
