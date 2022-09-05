<script setup>
import stat from '../../stat.json'
import LineChart from "./LineChart.js";


const stringToColor = (string, saturation = 100, lightness = 75) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`
}

const labels = new Set()

const datasets = stat.map(({package: packName, downloads}) => {
  const data = []


  for (const statForDay of downloads) {
    labels.add(statForDay.day)
    data.push(statForDay.downloads)
  }

  const label = packName.replace('@iconify-prerendered/vue-', '')
  const backgroundColor = stringToColor(label)


  return {
    label,
    data,
    backgroundColor,
  }
})
</script>

<template>
  <LineChart :data="{labels, datasets}"/>
</template>

