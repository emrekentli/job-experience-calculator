<script setup>
// take dynamic dates from user
// calculate the difference between two dates
// calculate the total experience in years, months, and days

import { ref } from 'vue';

const percentage = ref(0);
const annualGrossSalary = ref(0);
const calculatedText = ref('');
const currencies = [
    { name: 'Türk Lirası', code: 'TRY' , symbol: '₺'},
    { name: 'USD', code: 'USD' , symbol: '$'},
    { name: 'Euro', code: 'EUR', symbol: '€' },
    { name: 'Pound', code: 'GBP', symbol: '£' },
    { name: 'Yen', code: 'JPY', symbol: '¥' },
];
const selectedCurrency = ref(currencies[0]);
const calculate = () => {
    const calculated = annualGrossSalary.value * (percentage.value / 100);
    calculatedText.value = `Calculated: ${formatCurrency(calculated)}`;
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: selectedCurrency.value.code }).format(value);
    }
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h1>Net Salary Calculator</h1>
                <p>Calculate your net salary by entering your annual gross salary and the percentage you want to calculate.</p>
                <div class="formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="yearlySalary">Annual Gross Salary </label>
                        <InputNumber v-model="annualGrossSalary" inputId="currency-us" mode="currency"
                                     :currency="selectedCurrency.code" locale="tr-TR" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="startDate">Percentage</label>
                        <InputNumber prefix="%" v-model="percentage" />
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="startDate">Currency</label>
                        <Dropdown v-model="selectedCurrency" optionLabel="name"  :options="currencies" />
                    </div>
                </div>
                <Button label="Calculate" @click="calculate" />
                <h5>{{ calculatedText }} </h5>
            </div>
        </div>

    </div>
</template>
