<template>
  <div class="container">
    <router-link class="btn btn-info btn-new-supplier" to="/suppliers/create">
      ➕ New Supplier
    </router-link>

    <div class="table-responsive mt-3">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supplier in suppliers" :key="supplier.id">
            <td>{{ supplier.id }}</td>
            <td>{{ supplier.name }}</td>
            <td>{{ supplier.mobile }}</td>
            <td>{{ supplier.email }}</td>
            <td>
              <img
                :src="`/img/${supplier.photo}`"
                alt="photo"
                class="supplier-photo"
              />
            </td>
            <td>
              <div class="btn-group">
                <router-link
                  class="btn btn-sm btn-primary":to="`/suppliers/${supplier.id}/edit`"> Edit</router-link>
                <router-link
                  class="btn btn-sm btn-success":to="`/suppliers/${supplier.id}`">View</router-link>
                <router-link
                  class="btn btn-sm btn-danger":to="`/suppliers/delete/${supplier.id}`">Delete</router-link>
               
              </div>
            </td>
          </tr>
          <tr v-if="suppliers.length === 0">
            <td colspan="6" class="no-data">🚫 No supplier found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupplierList",
  data() {
    return {
      suppliers: [],
    };
  },
  mounted() {
    this.fetchSuppliers();
  },
  methods: {
    async fetchSuppliers() {
      try {
        const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/suppliers");
        const data = await res.json();
        this.suppliers = data.suppliers;
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 40px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.table thead th {
  background: linear-gradient(to right, #0d6efd, #3b82f6);
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
}

.table td {
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.btn-group a {
  margin: 0 4px;
}

.btn-new-supplier {
  margin-bottom: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

img.supplier-photo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ccc;
}

.no-data {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  padding: 20px;
  background-color: #fff3cd;
  color: #856404;
}
</style>
