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
    <div class="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h1>Job Experience Calculator</h1>
               <p>Calculate your total job experience in years, months, and days.</p>
                <div class="formgrid grid" v-for="date in dates" :key="date">
                    <div class="field col-12 md:col-5">
                        <label for="startDate">Start Date</label>
                        <Calendar v-model="date.startDate" view="month" dateFormat="mm/yy"  />
                    </div>
                    <div class="field col-12 md:col-5">
                        <label for="startDate">End Date</label>
                        <Calendar v-model="date.endDate" view="month" dateFormat="mm/yy"  />
                    </div>
                    <div class="field col-12 md:col-2 grid gap-5 align-content-center m-0">
                        <Button  icon="pi pi-plus" @click="addDate"  class="m-0 w-full md:w-3rem"/>
                        <Button severity="danger" icon="pi pi-times" @click="removeDate(date)" v-if="dates.length > 1" class="m-0 w-full md:w-3rem"/>
                    </div>
                <Divider />
                </div>
                <Button label="Calculate" @click="calculate" />
              <h5>{{ calculatedText }} </h5>
            </div>
        </div>

    </div>
</template>
