<template>
<div class="container">
  <navbar />
  <router-view />
</div>
</template>

<script>
import navbar from '@/components/NavBar'

export default {
  components: {
    navbar
  }
}
</script>