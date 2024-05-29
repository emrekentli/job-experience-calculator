<script setup>
import sozler from '../service/sozler.txt';
import { onMounted, ref } from 'vue';

const quotes = ref([])
const randomQuote = ref('');
onMounted(() => {
    fetch(sozler)
        .then(response => response.text())
        .then(text => {
            quotes.value = text.split('\n').filter(quote => quote.length>15);
            randomQuote.value = quotes.value[new Date().getDay() % quotes.value.length];

        });
});

</script>

<template>
    <div class="layout-footer">
        <span class="font-medium ml-2">Emre Kentli</span>
        <span class="font-medium ml-2">|</span>
        <span class="font-medium ml-2">{{ randomQuote }}</span>
    </div>
</template>
<style lang="scss" scoped></style>
