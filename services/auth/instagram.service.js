const { default: axios } = require('axios');

const INSTAGRAM_ENDPOINT_API = 'https://graph.instagram.com';

class InstagramService {

    async authenticate(token) {
        // const url = `${INSTAGRAM_ENDPOINT_API}/me?fields=id,name,email,birthday&access_token=${token}`;
        const url = `${INSTAGRAM_ENDPOINT_API}/me?fields=id,username&access_token=${token}`;

        try {
            const response = await axios.get(url);

            const body = response.data;

            return {
                success: true,
                data: {
                    id: body.id,
                    name: body.name,
                    email: body.email,
                    token: token,
                }
            };
        } catch (err) {
            console.error(err);
            console.error();
            return {
                success: false,
                error: ((err.response || {}).data || {}).error || {}
            };
        }
    }
}

module.exports = InstagramService;