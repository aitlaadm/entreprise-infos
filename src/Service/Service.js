import axios from 'axios';
axios.defaults.headers.get['Authorization']='Bearer 9dcb7025-2718-3c2c-9e67-45c184586a23';
class Service{
    getInfos(siret){

        return axios.get('https://api.insee.fr/entreprises/sirene/V3/siret/'+siret)
    }

}

export default new Service();