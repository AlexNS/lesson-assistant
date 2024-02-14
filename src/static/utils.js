const LA_EMAIL_KEY = 'la_email';

class Utils {
    
    saveEmailInStorage(email) {
        localStorage.setItem(LA_EMAIL_KEY, email);
    }

    getEmailFromStorage() {
        return localStorage.getItem(LA_EMAIL_KEY);
    }

    isSfeduEmail(email) {
        return /.*\@sfedu\.ru$/.test(email);
    }

    noSubmit(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    getGeoPositionAsync() {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };
        
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                resolve(pos.coords);
            }, (err) => {
                reject(err);
            }, options);
        });
    }

    getVisitorIdAsync() {
        if (this.visitorId) {
            return Promise.resolve(this.visitorId);
        } 

        return import('/a/fp.js')
            .then(FingerprintJS => FingerprintJS.load())
            .then(fp => fp.get())
            .then(result => {
                this.visitorId = result.visitorId;
                return this.visitorId;
            });
    }
}

window.LaUtils = new Utils();