<script setup>
import { ref, onMounted } from 'vue' 
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const purchaseId = route.params.id;

const purchase = ref({});
const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`;
const endpoint = `purchases/${purchaseId}`;

async function handleDelete() {
  if (confirm("Are you sure?")) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        alert("Delete failed!");
        return;
      }

      alert("✅ Deleted successfully!");
      router.push('/purchases');
    } catch (err) {
      console.error('Fetch Error:', err);
      alert('Error while deleting.');
    }
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    let c = await response.json();
    console.log('Fetched Purchase:', c);

    purchase.value = c.purchase ?? c; 
  } catch (err) {
    console.error('Fetch Error:', err);
  }
});
</script>

<template>
  <div class="confirm-container">

     <h2> Purchase ID #{{ purchaseId }}</h2> <br>
   
     
     <p>Are you sure you want to delete this purchase?</p>
   
    
  

    <input class="btn btn-danger" type="button" @click="handleDelete" value="Yes, Confirm Delete" /> <br>
    <router-link class="btn-back" to="/purchases">← Cancel</router-link>
  </div>
</template>



<style scoped>
.confirm-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff3f3;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.confirm-container h2 {
  color: #dc3545;
  margin-bottom: 20px;
}

.confirm-container p {
  font-size: 18px;
  margin-bottom: 30px;
}

.btn-danger {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
}

.btn-back {
  margin-top: 20px;
  display: inline-block;
  background-color: #6c757d;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #5a6268;
}
</style>
