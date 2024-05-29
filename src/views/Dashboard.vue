<script setup>
// take dynamic dates from user
// calculate the difference between two dates
// calculate the total experience in years, months, and days

import { ref } from 'vue';

const dates = ref([{
    startDate: null,
    endDate: null
}]);

const addDate = () => {
    dates.value.push({
        startDate: null,
        endDate: null
    });
};
const calculatedText = ref('');

const removeDate = (date) => {
    dates.value = dates.value.filter(d => d !== date);
};

const calculate = () => {
    let totalYears = 0;
    let totalMonths = 0;

    dates.value.forEach(period => {
        if (period.startDate && period.endDate) {
            const start = new Date(period.startDate);
            const end = new Date(period.endDate);

            let years = end.getFullYear() - start.getFullYear();
            let months = end.getMonth() - start.getMonth();

            if (months < 0) {
                years -= 1;
                months += 12;
            }

            totalYears += years;
            totalMonths += months;
        }
    });

    // Ayları yıllara çevirme
    if (totalMonths >= 12) {
        totalYears += Math.floor(totalMonths / 12);
        totalMonths = totalMonths % 12;
    }

    calculatedText.value = `Total Experience: ${totalYears} years, ${totalMonths} months`;
};

</script>

<template>
    <div class="grid justify-content-center">
        <div class="card">
            <h1>Job Experience Calculator</h1>
            <p>Calculate your total job experience in years, months, and days.</p>

            <div class="formgroup-inline" v-for="date in dates" :key="date">
                <div class="field">
                    <label for="startDate">Start Date</label>
                    <Calendar v-model="date.startDate" view="month" dateFormat="mm/yy" />
                </div>
                <div class="field">
                    <label for="startDate">End Date</label>
                    <Calendar v-model="date.endDate" view="month" dateFormat="mm/yy" />
                </div>
                <div class="flex gap-2">
                    <Button label="Add Date" @click="addDate" />
                    <Button severity="danger" label="Remove Date" @click="removeDate(date)" v-if="dates.length > 1" />
                </div>
            </div>
            <Button label="Calculate" @click="calculate" />
            <h5>{{ calculatedText }} </h5>
        </div>
    </div>

</template>
