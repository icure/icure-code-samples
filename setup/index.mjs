import { Api } from '@icure/api'
import { crypto } from '@icure/api/node-compat.js' //Only needed on node

const host = 'https://kraken.svc.icure.cloud/rest/v1';
const {
    userApi,
    healthcarePartyApi,
    cryptoApi
} = Api(host, 'abdemo@icxure.cloud', 'knalou', crypto)

const user = await userApi.getCurrentUser()
console.log(user.login)
