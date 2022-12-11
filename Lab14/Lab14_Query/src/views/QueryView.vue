<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs, limit, orderBy, getCountFromServer } from "firebase/firestore";
import db from "../firebase/init.js";
import Documents from "../components/Documents.vue";
import { useRoute } from "vue-router";
import CountDocument from "../components/CountDocument.vue";


const zips = ref([]);
const count = ref(0);
const title = ref("");
const route = useRoute();
const isCount = ref(false)

async function getQuery() {
  let qryId = route.params.id;
  zips.value = [];
  let qry = null;
  const zipsRef = collection(db, "zips");
  if (qryId == 1) {
    title.value = "Cities with population > 100000";
    isCount.value = false
    qry = query(zipsRef, where("pop", ">", 100000));
    await getData(qryId, qry)
  } else if (qryId == 2) {
    title.value = "Cities in New York";
    isCount.value = false
    qry = query(zipsRef, where("state", "==", "NY"), limit(10));
    await getData(qryId, qry)
  } else if (qryId == 3) {
    title.value = "List cities in DC with population > 40000";
    isCount.value = false
    qry = query(zipsRef, where("state", "==", "DC"), where("pop", ">", 40000), limit(10));
    await getData(qryId, qry)
  } else if (qryId == 4) {
    title.value = "Count cities in DC (state)";
    isCount.value = true
    const snapshot = await getCountFromServer(query(zipsRef, where("state", "==", "DC")));
    qry = snapshot.data().count
    await getData(qryId, qry)
  } else if (qryId == 5) {
    title.value = "List cities in DC or cities with population > 100000";
    isCount.value = false
    const qryDC = query(zipsRef, where("state", "==", "DC"), limit(10));
    const qryPop = query(zipsRef, where("pop", ">", 100000), limit(10));
    await getData(qryId, qryPop)
    await getData(qryId, qryDC)
  } else if (qryId == 6) {
    title.value = "List cities in DC and sort the cities by name (city field)";
    isCount.value = false
    qry = query(zipsRef, where("state", "==", "DC"), orderBy("city"), limit(10));
    await getData(qryId, qry)
  } else if (qryId == 7) {
    title.value = "Show the total population in DC (state)";
    isCount.value = true
    qry = query(zipsRef, where("state", "==", "DC"));
    await getData(qryId, qry)
  }
}

async function getData(qryId, qry) {
  // query snapshot
  if (qryId == 4) {
    count.value = qry
  } else if (qryId == 7){
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      count.value += data.pop
    })
  } else {
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      if (zips.value.length < 10) {
        zips.value.push(data);
      }
    })
  }
}

watch(() => route.params.id, getQuery);

onMounted(() => {
  getQuery();
});
</script>
<template>
  <CountDocument v-if="isCount" :title="title" :count="count" />
  <Documents v-else :title="title" :data="zips" />
  
</template>

<style></style>
