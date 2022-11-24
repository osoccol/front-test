import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ObjectService {
    constructor(private http: HttpClient) {
    }

    getObjects() {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3001/api/objects', {
                headers: {
                    email: window.sessionStorage.getItem('userEmail'),
                    authorization: window.sessionStorage.getItem('userToken')
                }
            }).subscribe((objects) => {
                resolve(objects); // objects présent dans le .then qui suit l'appel de la méthode getObjects() 
            }, (err) => {
                console.log(err);
                reject(); // objects présent dans le .catch qui suit l'appel de la méthode getObjects() 
            })
        })
    }
}