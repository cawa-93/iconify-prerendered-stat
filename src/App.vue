<script setup>

import PerDayStat from "./components/PerDayStat.vue";
import TotalStat from "./components/TotalStat.vue";
</script>

<template>
<div>
  <h1>Stats for @iconify-prerendered/vue-* packages</h1>
  <PerDayStat  style="height: 100vh"/>
  <TotalStat  style="height: 100vh"/>
</div>
</template>

<style>
div {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
