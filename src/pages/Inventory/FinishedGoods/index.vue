<template>
  <div class="container finished-container">
    <div class="finished-box">
      <div class="top-bar">
        <router-link class="btn btn-info" to="/finishedGoods/create">+ New Finished Goods</router-link>
      </div>

      <table class="table finished-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="finishedGoods.length === 0">
            <td colspan="7" class="empty-message">No Finished Goods Found.</td>
          </tr>
          <tr v-for="item in finishedGoods" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.order_date }}</td>
            <td>{{ item.finished_good_status }}</td>
            <td>
              <div class="btn-group">
                <router-link class="btn btn-primary" :to="`/finishedGoods/${item.id}/edit`">Edit</router-link>
                <router-link class="btn btn-success" :to="`/finishedGoods/${item.id}`">View</router-link>
                <router-link class="btn btn-danger" :to="`/finishedGoods/delete/${item.id}`">Delete</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const finishedGoods = ref([]);

    const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`;
    const endpoint = `finishedgoods`;

    onMounted(async () => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        const c = await response.json();
        console.log('Response JSON:', c); 

        finishedGoods.value = c.finishedgoods;

      } catch (err) {
        console.error('Fetch Error:', err);
      }
    });
</script>


<style scoped>
.finished-container {
  padding: 10px;
  background: #f0f2f5;
}

.finished-box {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.top-bar .btn {
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
}

.finished-table {
  width: 100%;
  border-collapse: collapse;
}

.finished-table th {
  background-color: #0d6efd;
  color: #fff;
  text-align: center;
  padding: 14px;
  font-size: 15px;
  border-bottom: 2px solid #dee2e6;
}

.finished-table td {
  text-align: center;
  padding: 12px 10px;
  font-size: 14px;
  border-bottom: 1px solid #dee2e6;
}

.finished-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.finished-table tr:hover {
  background-color: #e9f0f7;
  transition: 0.3s;
}

.btn-group .btn {
  margin-right: 6px;
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: 0.2s ease;
}

.btn-group .btn:hover {
  transform: scale(1.05);
}

.empty-message {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}
</style>
