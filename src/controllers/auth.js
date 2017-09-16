import cookie from 'js-cookie';
import { authenticate, signin as signinService } from 'src/services/auth';

class Auth {

    getToken() {
        // return 'xeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhd2Vlc29mdCIsImlhdCI6MTUwNTU1MjkzMCwiZXhwIjoxNTA1NjM5MzMwfQ.su41yv3eWnyrhTdk-gINTHpETRY7-8pU_aBeV6-22qw';
        return cookie.get('token');
    }

    removeToken() {
        cookie.remove('token');
        return true;
    }

    saveToken(token) {
        cookie.set('token', token);
    }

    signin(username, password) {
        return new Promise((resolve, reject) => {
            signinService(username, password)
                .then(res => {
                    this.saveToken(res.token);
                    resolve(res);
                })
                .catch(({ error }) => {
                    this.removeToken();
                    reject(error);
                });
        });
    }
}

export const AuthController = new Auth();