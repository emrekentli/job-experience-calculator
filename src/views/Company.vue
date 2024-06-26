<script setup>
import { FilterMatchMode } from 'primevue/api';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { getCompanies, saveCompanies } from '@/service/CompanyService';

const toast = useToast();

const companies = ref([]);
const companyDialog = ref(false);
const deleteCompanyDialog = ref(false);
const deleteCompaniesDialog = ref(false);
const company = ref({});
const selectedCompanies = ref(null);
const submitted = ref(false);
const dt = ref(null);
const filters = ref({});

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    getCompanies().then((data) => {
        companies.value = data;
    });
});

const openNew = () => {
    company.value = {};
    submitted.value = false;
    companyDialog.value = true;
};

const hideDialog = () => {
    companyDialog.value = false;
    submitted.value = false;
};

const saveCompany = () => {
    submitted.value = true;
    if (company.value.name && company.value.name.trim() && company.value.percentage && company.value.month) {
        if (company.value.id) {
            companies.value[findIndexById(company.value.id)] = company.value;
            console.log(companies.value);
            saveCompanies(companies.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });
        } else {
            company.value.id = createId();
            companies.value.push(company.value);
            saveCompanies(companies.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
        }
        companyDialog.value = false;
        company.value = {};
    }
};

const editCompany = (editCompany) => {
    company.value = { ...editCompany };
    companyDialog.value = true;
};

const confirmDeleteCompany = (editCompany) => {
    company.value = editCompany;
    deleteCompanyDialog.value = true;
};

const deleteCompany = () => {
    companies.value = companies.value.filter((val) => val.id !== company.value.id);
    deleteCompanyDialog.value = false;
    company.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
    saveCompanies(companies.value)
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < companies.value.length; i++) {
        if (companies.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
   return companies.value.length + 1;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteCompaniesDialog.value = true;
};
const deleteSelectedCompanies = () => {
    companies.value = companies.value.filter((val) => !selectedCompanies.value.includes(val));
    deleteCompaniesDialog.value = false;
    selectedCompanies.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Companies Deleted', life: 3000 });
    saveCompanies(companies.value);
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                    :disabled="!selectedCompanies || !selectedCompanies.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import"
                                    chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="companies"
                    v-model:selection="selectedCompanies"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Companies</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value"
                                           placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="id" header="#" :sortable="true" headerStyle="width:5%;">
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="percentage" header="Percentage" :sortable="true"
                            headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Percentage</span>
                            {{ (slotProps.data.percentage) + '%' }}
                        </template>
                    </Column>
                    <Column field="month" header="Month" :sortable="true" headerStyle="width:14%; min-width:8rem;" />
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                    @click="editCompany(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                    @click="confirmDeleteCompany(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="companyDialog" :style="{ width: '450px' }" header="Product Details"
                        :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="company.name" required="true" autofocus
                                   :invalid="submitted && !company.name" />
                        <small class="p-invalid" v-if="submitted && !company.name">Name is required.</small>
                    </div>
                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Percentage</label>
                            <InputNumber v-model="company.percentage" prefix="%"
                                         :invalid="submitted && !company.percentage" :required="true" />
                            <small class="p-invalid" v-if="submitted && !company.percentage">Percentage is
                                required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Month</label>
                            <InputNumber id="quantity" v-model="company.month" integeronly />
                            <small class="p-invalid" v-if="submitted && !company.month">Month is
                                required.</small>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="saveCompany" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteCompanyDialog" :style="{ width: '450px' }" header="Confirm"
                        :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="company"
                        >Are you sure you want to delete <b>{{ company.name }}</b
                        >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteCompanyDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteCompany" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteCompaniesDialog" :style="{ width: '450px' }" header="Confirm"
                        :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="company">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteCompaniesDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedCompanies" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
