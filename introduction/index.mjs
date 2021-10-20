//tech-doc: How to use
import {Api, b64_2ua, Patient} from '@icure/api'
import {crypto} from '@icure/api/node-compat.js'

const host = 'https://kraken.icure.dev/rest/v1';
const {
	patientApi,
	userApi,
	healthcarePartyApi,
	cryptoApi
} = Api(host, 'esmith', 'mypassword', crypto)

const loggedUser = await userApi.getCurrentUser();
const loggedHcp = await healthcarePartyApi.getCurrentHealthcareParty()

await cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
	loggedUser.healthcarePartyId,
	b64_2ua(/* truncate */"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDYYqdZfSHab4lywC/E5x1FbTtP3/977/0XWdgf3qv2PACvbMFaY0vDpTfXxmbWSMk5UaSW6usHxY+LvoQMSwN1IB8/bNmsYxFQ1BIRHJ2FvxAS3IgYhGTAczVIGvgoWqWVB4QzVjtAUD7LLbj/UINtuf0KFPRHPu5VOHZkca5BUabulO6qou4W1GVd/3H3sllYNZiU4Y1TVFCqDoqoynLj9gRsG8dXknSFYBSL7cWvP4UlRlOErSAg3PKOukXiqrj8/eCnnB/MH71HeM3r0+sK9i1ujvhF3AJR0eCn5tLjWPi00521/6QCHoo1Go12gwjdrKzCoigUMB2mSTHEd+9BAgMBAAECggEAQXM9qTzHM5oPGg11pXo+iVRr31IipetGQ3zieWlR3E3z6xvbNCrarNfZl0OksWYcr2C5hwiRhK1GKP+8UzeRWSkZKocTJChnAWrT+CcOonjTNNFNvRS2oNt4H1JBA3u/n99BJoILs/1RsQUoctl4l4TtO9JwvOgVEOPeM62LBqhMkmwXEYIEP/cne4qTeO8F0GCY797tBDYISZ7sM04pWb+3M1GCCJ5sZuS5Vlk05e2oxXLQBCSq1Ln8QP0obwQM/v6W0l2sw3c4oD2+v9tHwCfORQUSkA2s/A9kOy2AVTbLnH6iZBsxjiimNeVh+thtFHVGOjMx2TMbM7hYC+3N7QKBgQDs5drYUE3yzLwO6mf5i9HOrHvKwHGafepilAhSPLD4o8q9e1u4KiOuIyFloBXjxGyAt4VDYhvryalLJtC88VznFNq+8TLoGFIXy1WK4xupMHY6NVEPVRjH1WJwzNq3sVmHKqkC72jcC27c5c6y2FVnGzVFyaHgrOZ+6+YHAOrOQwKBgQDp1V8CZ8zrdO0yvApD7l6gjiwujUS2harbTNsM3AKVvxBj5NI5o1WUMdp3JLyUGBGalPEFTO4fhIiG41d7VCTKhOwN+ubpJJWBvr6vewLHHEcsYm8bGRP0iGOaiv67vI249wSPgUHs+K9wlGfrF/RsKrS8fCc3AphuRqEondfuKwKBgFavQSY4NF2tFv9qPMOuqwYyTVYCl09N1e9edbEJ7kP9Q1mUgxpfqRC2YCkcrAXdQUrUXJosk0TzVNRgDq+krjcMhYKrJdKR27BDQjkBI4UEa66fBdtTay7sYQofm8Tty3HPZWriif9C271PBhShXpbM+PBheK+K9QjqbxCPAFybAoGAH9VWe+NZuGxQpmmHFDxtUXpJdYTx589GtVg/Mf75sx0xxAewvvwHeIdY8INl0Nt9+gdw0IHqoQvP8l0c2cNYxuFVqYmQygia+fDX0Nf0RtsIrXgxHAVL/CxdMvrdNv2yZY3rZwX3zaUFbVQm2ZCHS/p8ZHSaehi2W7ztz7O9Y8UCgYBDtM0GyuOYO77xtUvIVv75jfezW/HTvCgSSrhOIi8nPpSC9Iu28Hdt+EH8xQ1d8mZdVC3TapUnE9ks9sNzAA7p8oSqW17ks/nePXYk+SW6QPR83YWG9g9UqVinOCg0hlOAJ+jtYBHj/b7DD0VvKuRosx4APJBA/EVZry9HOmEwWQ==")
)

const patient = await patientApi.createPatientWithUser(loggedUser,
	await patientApi.newInstance(
		loggedUser,
		new Patient({
			firstName: 'Gustave',
			lastName: 'Eiffel',
			profession: 'Architect & Engineer',
			dateOfBirth: 19731012,
			note: 'A very private information'
		}))
)
const fetchedPatient = await patientApi.getPatientWithUser(loggedUser, patient.id)
console.log(JSON.stringify(fetchedPatient, null, ' '))
