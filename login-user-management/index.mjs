import {Api } from '@icure/api'
import { crypto } from '@icure/api/node-compat.js' //Only needed on node

const host = 'https://kraken.icure.dev/rest/v1';
const {
    userApi,
    healthcarePartyApi,
    cryptoApi
} = Api(host, 'abdemo', 'knalou', crypto)

import { ua2hex, HealthcareParty, User } from '@icure/api'

const { publicKey, privateKey } = await cryptoApi.RSA.generateKeyPair()
const exportedKey = ua2hex(await cryptoApi.RSA.exportKey(privateKey, 'pkcs8'))

//The private key will have to be stored in a secured place and used later
console.log(exportedKey)

const newHcp = await healthcarePartyApi.createHealthcareParty(
    new HealthcareParty({
        id: cryptoApi.randomUuid(),
        firstName: 'Elliott',
        lastName: 'Smith',
        publicKey: ua2hex(await cryptoApi.RSA.exportKey(publicKey, 'spki'))
    })
)

const newUser = await userApi.createUser(new User({
    id: cryptoApi.randomUuid(),
    healthcarePartyId: newHcp.id,
    login: 'esmith',
    passwordHash: 'mypassword'
}))

console.log(newUser)
