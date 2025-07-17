<template>
  <div class="container production-container">
    <router-link class="btn btn-info btn-add" to="/productions/create">
      <i class="fas fa-plus-circle"></i> New Production
    </router-link>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Production Date</th>
            <th>Product Name</th>
            <th>Raw Material Used</th>
            <th>Raw Material Qty</th>
            <th>Unit</th>
            <th>Total Produced</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="productions.length === 0">
            <td colspan="7" class="text-center text-muted">No Production</td>
          </tr>
          <tr v-for="production in productions" :key="production.id">
            <td>{{ production.production_date }}</td>
            <td>{{ production.product?.name || 'no name' }}</td>
            <td>{{ production.raw_material?.name || 'no name' }}</td>
            <td>{{ production.raw_material?.unit || 'no unit' }}</td>
            <td>{{ production.unit }}</td>
            <td>{{ production.quantity_produced }}</td>
            <td>
              <div class="btn-group">
                <router-link class="btn btn-primary btn-sm" :to="`/productions/${production.id}/edit`">Edit</router-link>
                <router-link class="btn btn-success btn-sm" :to="`/productions/${production.id}`">View</router-link>
                <router-link class="btn btn-warning btn-sm" :to="`/productions/delete/${production.id}`">Delete</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav v-if="pagination.total > pagination.per_page" class="pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
          <button class="page-link" @click="fetchProductions(pagination.current_page - 1)">Previous</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === pagination.current_page }">
          <button class="page-link" @click="fetchProductions(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
          <button class="page-link" @click="fetchProductions(pagination.current_page + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'


const productions = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 10,
  next_page_url: null,
  prev_page_url: null
})

const fetchProductions = async (page = 1) => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/productions?page=${page}`)
    const data = await res.json()
    productions.value = data.productions,
    pagination.value = {
      current_page: data.current_page,
      last_page: data.last_page,
      total: data.total,
      per_page: data.per_page,
      next_page_url: data.next_page_url,
      prev_page_url: data.prev_page_url
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const totalPages = computed(() => {
  return Array.from({ length: pagination.value.last_page }, (_, i) => i + 1)
})

onMounted(() => {
  fetchProductions()
})
</script>

<style scoped>
body {
  background-color: #f4f6f9;
}

.production-container {
  margin-top: 40px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.btn-add {
  margin-bottom: 20px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
}

table thead th {
  background: linear-gradient(90deg, rgb(18, 187, 145), #00cec9);
  color: white;
  text-align: center;
  padding: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  border: none;
}

table tbody td {
  text-align: center;
  vertical-align: middle;
  padding: 12px 10px;
  font-size: 14px;
}

table tbody tr:nth-child(odd) {
  background-color: #fdfdfe;
}

table tbody tr:nth-child(even) {
  background-color: #f7f9fc;
}

table tbody tr:hover {
  background-color: #dff6f0;
  transition: all 0.3s ease;
}

.btn-group .btn {
  margin-right: 6px;
  border-radius: 6px;
  font-size: 13px;
  padding: 6px 12px;
  transition: transform 0.2s ease;
}

.btn-group .btn:hover {
  transform: scale(1.06);
}

.pagination {
  margin-top: 30px;
}

.pagination .page-link {
  color: #00b894;
  font-weight: 500;
}

.pagination .active .page-link {
  background-color: #00b894;
  border-color: #00b894;
}
</style>
