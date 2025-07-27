<template>
  <div class="container mt-5">
    <h2 class="mb-4">Edit Production</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Production Date</label>
        <input
          type="date"
          v-model="form.production_date"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Product</label>
        <select v-model="form.product_id" class="form-control" required>
          <option value="">Select Product</option>
          <option
            v-for="product in products"
            :key="product.id"
            :value="product.id"
          >
            {{ product.name || "Unnamed" }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Raw Material</label>
        <select v-model="form.raw_material_id" class="form-control" required>
          <option value="">Select Raw Material</option>
          <option
            v-for="raw in rawmaterials"
            :key="raw.id"
            :value="raw.id"
          >
            {{ raw.name || "Unnamed" }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Raw Material Quantity</label>
        <input
          type="number"
          v-model="form.raw_material_qty"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Unit</label>
        <input
          type="text"
          v-model="form.unit"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Quantity Produced</label>
        <input
          type="number"
          v-model="form.quantity_produced"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Update Production</button>
      <router-link to="/productions" class="btn btn-secondary ms-2">Cancel</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";
const id = route.params.id;

const form = ref({
  production_date: "",
  product_id: "",
  raw_material_id: "",
  raw_material_qty: "",
  unit: "",
  quantity_produced: ""
});

const products = ref([]);
const rawmaterials = ref([]);
const error = ref("");

const fetchData = async () => {
  try {
    const prodRes = await fetch(`${baseUrl}/productions/${id}`);
    const prodData = await prodRes.json();

    const productRes = await fetch(`${baseUrl}/products`);
    const productData = await productRes.json();

    const rawRes = await fetch(`${baseUrl}/rawmaterials`);
    const rawData = await rawRes.json();

    if (prodData?.production) {
      form.value = {
        production_date: prodData.production.production_date || "",
        product_id: prodData.production.product_id || "",
        raw_material_id: prodData.production.raw_material_id || "",
        raw_material_qty: prodData.production.raw_material_qty?.toString() || "",
        unit: prodData.production.unit || "",
        quantity_produced: prodData.production.quantity_produced?.toString() || ""
      };
    }

    products.value = productData.products || [];
    rawmaterials.value = rawData.rawmaterials || [];
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = "Failed to load data.";
  }
};

const handleSubmit = async () => {
  try {
    const response = await fetch(`${baseUrl}/productions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form.value)
    });

    if (response.ok) {
      router.push("/productions");
    } else {
      const errData = await response.json();
      error.value = errData.message || "Failed to update.";
    }
  } catch (err) {
    console.error("Submit error:", err);
    error.value = "Error submitting form.";
  }
};

onMounted(fetchData);
</script>
