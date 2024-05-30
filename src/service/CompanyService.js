import { getCompany, setCompany } from '@/service/store/CompanyStore';


export async function getCompanies() {
    return getCompany();
}

export async function saveCompanies(companies) {
    return setCompany(companies);
}
