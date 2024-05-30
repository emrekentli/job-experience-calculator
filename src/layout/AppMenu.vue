<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Job Experience Calculator', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Percentage Calculator', icon: 'pi pi-fw pi-percentage', to: '/percentage' },
            { label: 'Companies', icon: 'pi pi-fw pi-home', to: '/companies' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <li>

        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
