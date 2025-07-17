<script setup>
import Topbar from './Topbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';




</script>

<template>
  <div id="main-wrapper">
    
    <Topbar />

   
    <Sidebar />

    <div class="content-body">
            
        <Router-view></Router-view>
    </div>

    <Footer/>
  </div>
</template>



<style scoped>
.content-body {
  margin-left: 250px; 
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
}
</style>