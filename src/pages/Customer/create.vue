<script setup>
  import { ref } from 'vue'

  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`
  const endpoint = `customers`

  const product = ref({
    name: '',
    mobile: '',
    email: ''
  })

  const file = ref(null)
  const message = ref('')

  function handleFile(event) {
    file.value = event.target.files[0]
  }

  async function submitCustomer() {
    const formData = new FormData()
    formData.append('name', product.value.name)
    formData.append('mobile', product.value.mobile)
    formData.append('email', product.value.email)
    formData.append('photo', file.value)

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      message.value = result.message || 'Upload successful'
    } catch (error) {
      message.value = 'Upload failed: ' + error.message
    }
  }
</script>

<template>
  <div class="form-container">
    <h1>Create Customer</h1>
    <router-link class="btn-back" to="/customers">← Back</router-link>

    <p class="message" v-if="message">{{ message }}</p>

    <form @submit.prevent="submitCustomer" class="customer-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="product.name" type="text" id="name" name="name" required />
      </div>

      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input v-model="product.mobile" type="text" id="mobile" name="mobile" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="product.email" type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" id="photo" @change="handleFile" accept="image/*" required />
      </div>

      <div class="form-group">
        <input type="submit" value="Submit" class="btn-submit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 1150px;
  margin: 40px auto;
  padding: 30px 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #0d6efd;
  margin-bottom: 25px;
  text-align: center;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: #5a6268;
}

.message {
  margin-bottom: 15px;
  padding: 12px 15px;
  background-color: #d1e7dd;
  color: #0f5132;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  border: 1px solid #badbcc;
}

.customer-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 15px;
}

input[type="text"],
input[type="email"],
input[type="file"] {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
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
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #084fc2;
}
</style>
