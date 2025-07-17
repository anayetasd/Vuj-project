<template>
  <div>
    <router-link class="btn-back" to="/rawMaterials">← Back</router-link>

    <div class="form-container" v-if="form">
      <h2>Edit Raw Material</h2>

      <form @submit.prevent="updateMaterial">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" required />

        <label for="unit">Unit</label>
        <input v-model="form.unit" type="text" id="unit" required />

        <label for="price_per_unit">Price per Unit</label>
        <input v-model="form.price_per_unit" type="text" id="price_per_unit" required />

        <input type="submit" value="Update" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RawMaterialEdit",
  data() {
    return {
      form: {
        name: "",
        unit: "",
        price_per_unit: "",
      },
    };
  },
  created() {
    this.fetchMaterial();
  },
  methods: {
    async fetchMaterial() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://anayet.intelsofts.com/project_app/public/api/rawmaterials/${id}`);
        if (!response.ok) throw new Error("Failed to load raw material");
        const data = await response.json();

        // যদি API data এইভাবে আসে: { rawmaterial: { name, unit, price_per_unit } }
        const rm = data.rawmaterial ?? data;

        this.form = {
          name: rm.name,
          unit: rm.unit,
          price_per_unit: rm.price_per_unit,
        };
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    async updateMaterial() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://anayet.intelsofts.com/project_app/public/api/rawmaterials/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) throw new Error("Update failed");

        alert("Raw material updated successfully!");
        this.$router.push("/rawMaterials");
      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update raw material.");
      }
    },
  },
};
</script>


<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", sans-serif;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #005792;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input[type="text"] {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

input[type="submit"] {
  background-color: #005792;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

input[type="submit"]:hover {
  background-color: #003f66;
}

.btn-back {
  display: inline-block;
  margin: 20px auto 10px 40px;
  text-decoration: none;
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 15px;
}

.btn-back:hover {
  background-color: #218838;
}
</style>
