<script setup>
  import {ref,onMounted } from 'vue'   
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const customerId = route.params.id;     

  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`   
  const endpoint = `customers/${customerId}`

  const customer = ref({
    name: '',
    mobile: '',
    email: ''
  });

  const file = ref(null);
  const message = ref('');

  onMounted(async () => {  
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'        
        }
      });  

      let c= await response.json();    
      customer.value = c;
    } catch (err) {
      console.error('Fetch Error:', err);
      throw err;
    }
  })

  function handleFile(event) {
    file.value = event.target.files[0];
  }

  async function submitCustomer() {
    const formData = new FormData();
    formData.append('name', customer.value.name);
    formData.append('mobile', customer.value.mobile);
    formData.append('email', customer.value.email);
    formData.append('photo', file.value); // image file

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',      
        body: formData,
      });

      const result = await response.json();
      message.value = result.message || 'Upload successful';
    } catch (error) {
      message.value = 'Upload failed: ' + error.message;
    }
  }
</script>

<template>    
  <div class="form-container">
    <h1>Edit Customer</h1>
    <router-link class="btn-back" to="/customers">← Back</router-link>

    <p class="message" v-if="message">{{ message }}</p>

    <form @submit.prevent="submitCustomer" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="customer.name" type="text" id="name" name="name" required />
      </div>

      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input v-model="customer.mobile" type="text" id="mobile" name="mobile" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="customer.email" type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" id="photo" @change="handleFile" accept="image/*" />
      </div>

      <button type="submit" class="btn-submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 1100px;
  margin: 40px auto;
  padding: 30px 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #0d6efd;
  margin-bottom: 25px;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  color: #6c757d;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.btn-back:hover {
  color: #495057;
}

.message {
  margin: 15px 0;
  padding: 10px;
  background-color: #e7f3ff;
  border: 1px solid #b6d4fe;
  color: #3178c6;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

input[type="text"],
input[type="email"],
input[type="file"] {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="file"]:focus {
  border-color: #0d6efd;
  outline: none;
}

.btn-submit {
  background-color: #0d6efd;
  color: white;
  padding: 14px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 20%;
}

.btn-submit:hover {
  background-color: #084fc2;
}
</style>
