import {lookupCollections} from '@iconify/json';
import * as fs from 'node:fs'

function loadStatForPackage(packageName) {
    console.log(`Loading ${packageName}`)
    return fetch(`https://api.npmjs.org/downloads/range/last-year/${packageName}`).then(r => r.json())
}


const stats = await Promise.all(
    Object.keys(await lookupCollections())
        .map(collectionName =>
            loadStatForPackage(`@iconify-prerendered/vue-${collectionName}`)
        )
)

fs.writeFileSync('./stat.json', JSON.stringify(stats), {encoding: 'utf8'})
