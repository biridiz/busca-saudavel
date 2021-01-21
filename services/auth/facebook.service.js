const { default: axios } = require('axios');

const FACEBOOK_ENDPOINT_API = 'https://graph.facebook.com/v2.10';

class FacebookService {

    async authenticate(token) {
        const url = `${FACEBOOK_ENDPOINT_API}/me?fields=id,name,email,birthday&access_token=${token}`;

        try {
            const response = await axios.get(url);

            const body = response.data;

            return {
                id: body.id,
                provider: EnumSocialProvider.Facebook,
                name: body.name,
                email: body.email,
                token: token,
            };
        } catch (err) {
            console.error(err);
            return null;
        }
    }

}

module.exports = FacebookService;