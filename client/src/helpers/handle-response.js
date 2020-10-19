import { accountService } from '../services/account';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                accountService.logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // if the response is OK return the data
        return data;
    });
}