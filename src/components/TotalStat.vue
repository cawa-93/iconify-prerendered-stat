<script setup>
import stat from '../../stat.json'
import PieChart from './PieChart.js'


/*


{
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }

 */

const stringToColor = (string, saturation = 100, lightness = 75) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`
}


const totalMap = stat
    .map(({package: packName, downloads}) => {
      const total = downloads.reduce((sum, d) => sum + d.downloads, 0)
      return {label: packName.replace('@iconify-prerendered/vue-', ''), total}
    })
    .sort((d1, d2) => d2.total - d1.total)

const labels = totalMap.map(({label}) => label)
const dataset = totalMap.reduce(
    (d, {label, total}) => {
      d.backgroundColor.push(stringToColor(label))
      d.data.push(total)
      return d
    },
    ({backgroundColor: [], data: []})
)
</script>

<template>
  <PieChart :data="{labels, datasets: [dataset]}"/>
</template>

