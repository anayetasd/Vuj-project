<template>
  <div class="form-container">
    <h1 class="heading">Create Customer</h1>
    <router-link to="/customers" class="back-btn">← Back</router-link>

    <p v-if="message" class="message">{{ message }}</p>

    <form @submit.prevent="submitCustomer" class="form">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" type="text" name="name" required />
      </div>

      <div class="form-group">
        <label>Mobile</label>
        <input v-model="form.mobile" type="text" name="mobile" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" name="email" required />
      </div>

      <div class="form-group">
        <label>Address</label>
        <input v-model="form.address" type="text" name="address" required />
      </div>

      <div class="form-group">
        <label>Photo</label>
        <input type="file" accept="image/*" @change="handleFile" required />
      </div>

      <div v-if="preview" class="image-preview">
        <img :src="preview" alt="Preview" class="image" />
      </div>

      <div class="form-group">
        <button type="submit" class="submit-btn">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/customers';

const form = ref({
  name: '',
  mobile: '',
  email: '',
  address: ''
});

const file = ref(null);
const preview = ref(null);
const message = ref('');

function handleFile(e) {
  const selected = e.target.files[0];
  if (!selected) return;

  if (!selected.type.startsWith('image/')) {
    alert('Please select a valid image file');
    return;
  }

  file.value = selected;

  const reader = new FileReader();
  reader.onloadend = () => {
    preview.value = reader.result;
  };
  reader.readAsDataURL(selected);
}

async function submitCustomer() {
  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('mobile', form.value.mobile);
  formData.append('email', form.value.email);
  formData.append('address', form.value.address);
  formData.append('photo', file.value);

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message || 'Customer saved successfully!');
      setTimeout(() => router.push('/customers'), 1000);
    } else {
      alert(result.message || 'Something went wrong!');
    }
  } catch (error) {
    alert('Upload failed: ' + error.message);
  }
}
</script>

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
.heading {
  color: #0d6efd;
  margin-bottom: 25px;
  text-align: center;
}
.back-btn {
  display: inline-block;
  margin-bottom: 20px;
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
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
.form {
  display: flex;
  flex-direction: column;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
input[type='text'],
input[type='email'],
input[type='file'] {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}
.submit-btn {
  background-color: #0d6efd;
  color: white;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.image-preview {
  margin-bottom: 20px;
  text-align: center;
}
.image {
  max-width: 150px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
