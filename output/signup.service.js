import {
    Injectable
} from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';
import {
    Observable
} from 'rxjs/Observable';

@Injectable()

export class SignupService {
    constructor(private http: HttpClient) {};
    submit(model) {
        const url = 'https://desktop-dev.worldtracer.aero/1.2.0.17/wtrui-web/v6.0/Proxy/login/loginAuth';
        return this.http.post(url, model);
    }
}