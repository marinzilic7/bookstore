<template>
    <div>
      <h1>Korisnici</h1>
      <ul>
        <li v-for="user in users" :key="user._id">
          {{ user.name }} {{ user.surname }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
      }
    }
  };
  </script>
  