
<script setup>
  import {ref, onMounted } from 'vue' 
  import { useRoute,useRouter  } from 'vue-router';
   
  const router = useRouter();
    const route = useRoute();
    const finishedGoodID = route.params.id;

     const finishedGood = ref({});

  const baseUrl=`http://anayet.intelsofts.com/project_app/public/api/`
  const endpoint=`finishedgoods/${finishedGoodID}`

  async function handleDelete() {      
       if(confirm("Are you sure?")){
         try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'        
      }
          
    });  

    let c= await response.json();    
    router.push('/finishedgoods');


    console.log(c)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }
         
       }
  }

onMounted(async () => {  

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'        
      }
          
    });  

    let c= await response.json();    
    finishedGood.value = c.finishedgood ?? c 
    console.log(c)

  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }

})

</script>





<template>
  <div class="confirm-container" v-if="finishedGood">
    <h2>Delete Product: {{ finishedGood.product_name }}</h2>
    <p>Are you sure you want to delete this finished good?</p>

    <form @submit.prevent="handleDelete">
      <button class="btn btn-danger" type="submit">Yes, Confirm Delete</button>
    </form>

    <router-link class="btn-back" to="/finishedGoods">← Cancel</router-link>
  </div>
</template>

<!-- <script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const finishedGood = ref(null)

const fetchFinishedGood = async () => {
  try {
    const res = await fetch(`http://localhost/laravel12/project_app/public/api/finishedgoods/${route.params.id}`)
    const data = await res.json()
    finishedGood.value = data.finishedGood;
  } catch (err) {
    console.error('Failed to fetch:', err)
  }
}

const confirmDelete = async () => {
  try {
    const res = await fetch(`http://localhost/laravel12/project_app/public/api/finishedgoods/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!res.ok) throw new Error('Delete failed')

    const result = await res.json()
    console.log('Deleted:', result)

    router.push('/finishedGoods')
  } catch (err) {
    console.error('Delete error:', err)
  }
}

onMounted(fetchFinishedGood)
</script> -->

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
