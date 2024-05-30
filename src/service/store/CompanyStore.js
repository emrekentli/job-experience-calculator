import { getItem, setItem } from '@/library/BaseStorageService'

const KEY = 'company'

export function setCompany(company) {
  setItem(KEY, company)
}

export function getCompany() {
 var companies = getItem(KEY)
  if(companies === null || companies.length === 0){
    setItem(KEY, [{
      "id":1,
      "name":"Maher",
      "percentage":30,
      "month":12
    },
      {
        "id":2,
        "name":"Logosoft",
        "percentage":30,
        "month":12
      }])
    companies = getItem(KEY)
  }
  return companies
}
