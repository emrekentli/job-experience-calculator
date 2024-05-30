<script setup>

import { onMounted, ref } from 'vue';
import { getCompanies } from '@/service/CompanyService';

const company = ref(0);
const monthlySalary = ref(0);
const yearlyText = ref('');
const monthlyText = ref('');
const currencies = [
    { name: 'Türk Lirası', code: 'TRY', symbol: '₺' },
    { name: 'USD', code: 'USD', symbol: '$' },
    { name: 'Euro', code: 'EUR', symbol: '€' },
    { name: 'Pound', code: 'GBP', symbol: '£' },
    { name: 'Yen', code: 'JPY', symbol: '¥' }
];
const companies = ref([]);
onMounted(() => {
    getCompanies().then((res) => {
        companies.value = res;
        company.value = companies.value[0];
    });
})
const selectedCurrency = ref(currencies[0]);
const calculate = () => {
    const yearly = (monthlySalary.value * company.value.month) * (company.value.percentage / 100);
    const monthly = (monthlySalary.value ) * (company.value.percentage / 100);
    yearlyText.value = `Yearly: ${formatCurrency(yearly)}`;
    monthlyText.value = `Monthly: ${formatCurrency(monthly)}`;
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: selectedCurrency.value.code }).format(value);
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h1>Percentage Calculator</h1>
                <p>Calculate the percentage of your salary</p>
                <div class="formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="yearlySalary">Monthly Salary </label>
                        <InputNumber v-model="monthlySalary" inputId="currency-us" mode="currency"
                                     :currency="selectedCurrency.code" locale="tr-TR" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="startDate">Company</label>
                        <Dropdown v-model="company" optionLabel="name" :options="companies" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="startDate">Currency</label>
                        <Dropdown v-model="selectedCurrency" optionLabel="name" :options="currencies" />
                    </div>
                </div>
                <Button label="Calculate" @click="calculate" />
                <h5>{{ yearlyText }} </h5>
                <h5>{{ monthlyText }} </h5>
            </div>
        </div>

    </div>
</template>
