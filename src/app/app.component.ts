import { Component, NgZone, AfterViewInit } from '@angular/core';

declare var gapi: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    title = 'app';
    googleLoginButtonId = 'google-login-button';
    userAuthToken = null;
    userDisplayName = 'empty';

    constructor(
        private _zone: NgZone) {
        console.log(this);
    }

    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    ngAfterViewInit() {
        // Converts the Google login button stub to an actual button.
        gapi.signin2.render(
            this.googleLoginButtonId,
            {
                'onSuccess': this.onGoogleLoginSuccess,
                'scope': 'profile',
                'theme': 'dark'
            });
    }

    // Triggered after a user successfully logs in using the Google external
    // login provider.
    onGoogleLoginSuccess = (loggedInUser) => {
        this._zone.run(() => {
            this.userAuthToken = loggedInUser.getAuthResponse().id_token;
            this.userDisplayName = loggedInUser.getBasicProfile().getName();
        });
    }
}
