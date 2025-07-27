<template>
  <div :style="styles.container">
    <router-link
      to="/products"
      class="btn btn-success"
      :style="{ marginBottom: '20px', display: 'inline-block' }"
    >
      ← Back
    </router-link>

    <h2 :style="styles.heading">Product Details</h2>

    <table :style="styles.table" v-if="product">
      <tbody>
        <tr>
          <td :style="styles.label">Id</td>
          <td>{{ product.id }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Name</td>
          <td>{{ product.name }}</td>
        </tr>
        <tr>
          <td :style="styles.label">Photo</td>
          <td>
            <img
              :src="`http://anayet.intelsofts.com/project_app/public/img/${product.photo}`"
              :alt="product.name"
              :style="styles.image"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);

const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

const styles = {
  container: {
    maxWidth: "950px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#343a40",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  label: {
    fontWeight: "bold",
    color: "#495057",
    width: "30%",
    padding: "12px 16px",
    borderBottom: "1px solid #dee2e6",
    fontSize: "16px",
  },
  image: {
    maxWidth: "200px",
    height: "auto",
    borderRadius: "8px",
    border: "1px solid #ced4da",
  },
};

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}/products/${route.params.id}`);
    const data = await res.json();
    product.value = data.product || data;
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
});
</script>
