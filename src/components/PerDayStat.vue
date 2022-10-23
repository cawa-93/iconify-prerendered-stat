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

const {format} = new Intl.DateTimeFormat('uk', {year: '2-digit', month: 'long'});

const datasets = stat.map(({package: packName, downloads}) => {

  /** @type {Map<string, number>} */
  const perMonthMap = new Map()

  for (const statForDay of downloads) {
    const date = new Date(statForDay.day)
    date.setDate(1)
    const mouth = format(date)
    labels.add(mouth)
    perMonthMap.set(mouth, (perMonthMap.get(mouth) || 0) + statForDay.downloads)
  }


  const data = Array.from(perMonthMap.values())

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

