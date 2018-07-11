import {
    Component,
    OnInit
} from '@angular/core';
import {
    SignupService
} from './signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [SignupService]
})

export class SignupComponent implements OnInit {

    userId;
    companyId;
    password;
    stationType;
    capId;

    constructor(private service: SignupService) {};

    ngOnInit() {};

    submit() {
        const payload = {
            "user": {
                "userId": "GUEST",
                "companyId": "U2",
                "password": "Guest@123",
                "stationType": "A"
            },
            "captcha": {
                "capId": "No_Captcha"
            }
        };
        this.service.submit(payload).subscribe(response => {
            console.log(values);
        }, err => {
            console.log(error);
        });
    };
}