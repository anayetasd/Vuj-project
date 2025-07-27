<template>
  <div :style="styles.formContainer">
    <h1 :style="styles.heading">Edit Customer</h1>
    <RouterLink to="/customers" :style="styles.btnBack">← Back</RouterLink>

    <p v-if="message" :style="styles.message">{{ message }}</p>

    <form @submit.prevent="submitCustomer" :style="styles.form">
      <div :style="styles.formGroup">
        <label for="name">Name</label>
        <input
          v-model="customer.name"
          type="text"
          id="name"
          name="name"
          required
          :style="styles.input"
        />
      </div>

      <div :style="styles.formGroup">
        <label for="mobile">Mobile</label>
        <input
          v-model="customer.mobile"
          type="text"
          id="mobile"
          name="mobile"
          required
          :style="styles.input"
        />
      </div>

      <div :style="styles.formGroup">
        <label for="email">Email</label>
        <input
          v-model="customer.email"
          type="email"
          id="email"
          name="email"
          required
          :style="styles.input"
        />
      </div>

      <div :style="styles.formGroup">
        <label for="photo">Photo</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          @change="handleFileChange"
          :style="styles.input"
        />
      </div>

      <button type="submit" :style="styles.btnSubmit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const customer = reactive({
  name: '',
  mobile: '',
  email: '',
})
const file = ref(null)
const message = ref('')
const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/customers/${id}`

const fetchCustomer = async () => {
  try {
    const res = await fetch(baseUrl)
    const data = await res.json()
    customer.name = data.name
    customer.mobile = data.mobile
    customer.email = data.email
  } catch (err) {
    console.error('Fetch error:', err)
    message.value = 'Failed to load customer data'
  }
}

onMounted(fetchCustomer)

const handleFileChange = (e) => {
  file.value = e.target.files[0]
}

const submitCustomer = async () => {
  const formData = new FormData()
  formData.append('name', customer.name)
  formData.append('mobile', customer.mobile)
  formData.append('email', customer.email)
  formData.append('_method', 'PUT')
  if (file.value) {
    formData.append('photo', file.value)
  }

  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      const result = await res.json()
      message.value = result.message || 'Update successful'
      setTimeout(() => {
        router.push('/customers')
      }, 1500)
    } else {
      message.value = 'Failed to update customer'
    }
  } catch (error) {
    message.value = 'Upload failed: ' + error.message
  }
}
</script>

<style scoped>
/* You may move this to global or keep using inline styles as in the React version */
</style>

<script>
const styles = {
  formContainer: {
    width: '1100px',
    margin: '40px auto',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    color: '#0d6efd',
    marginBottom: '25px',
  },
  btnBack: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#1c5d96ff',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.3s ease',
  },
  message: {
    margin: '15px 0',
    padding: '10px',
    backgroundColor: '#e7f3ff',
    border: '1px solid #b6d4fe',
    color: '#3178c6',
    borderRadius: '6px',
    fontWeight: 600,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px 12px',
    border: '1.5px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'border-color 0.3s ease',
  },
  btnSubmit: {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '20%',
  },
}
</script>
