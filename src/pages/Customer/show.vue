<template>
  <div :style="styles.container">
    <div :style="styles.header">
      <h2 :style="styles.title">Customer Details</h2>
      <RouterLink to="/customers" :style="styles.btnBack">← Back</RouterLink>
    </div>

    <table :style="styles.table">
      <tbody v-if="customer">
        <tr>
          <td :style="styles.label">ID</td>
          <td>{{ customer.id }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Name</td>
          <td>{{ customer.name }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Mobile</td>
          <td>{{ customer.mobile }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Email</td>
          <td>{{ customer.email }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Address</td>
          <td>{{ customer.address }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Photo</td>
          <td>
            <img
              v-if="customer.photo"
              :src="`http://anayet.intelsofts.com/project_app/public/img/${customer.photo}`"
              alt="Customer"
              :style="styles.image"
            />
            <span v-else style="color: #888">No photo available</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="2">Loading...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const customer = ref(null)
const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/customers/'

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}${route.params.id}`)
    const data = await res.json()
    customer.value = data.data || data
  } catch (err) {
    console.error('Fetch error:', err)
  }
})

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '50px auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  },
  btnBack: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  label: {
    padding: '15px 12px',
    borderBottom: '1px solid #eaeaea',
    verticalAlign: 'top',
    fontWeight: '600',
    color: '#555',
    width: '30%',
    backgroundColor: '#f9f9f9'
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #ddd'
  }
}
</script>
