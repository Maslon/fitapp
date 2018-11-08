import { AngularFirestore } from '@angular/fire/firestore';
import { TrainingService } from './../training/training.service';
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth"
import { UIService } from '../shared/ui.service';


@Injectable({providedIn:"root"})

export class AuthService {
    private isAuth = false;
    authChange = new Subject<boolean>();
    sendUser = new Subject<string>()

    constructor(private router: Router, 
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService,
                private db: AngularFirestore){}


    initAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.isAuth = true
                this.authChange.next(true),
                this.router.navigate(["/training"])
                console.log("prasata")
            } else {
                this.authChange.next(false)
                this.router.navigate(["/"])
                this.isAuth = false
                this.trainingService.cancelSubscriptions()
            }
        })
    }

    registerUser(authData: AuthData){
        this.uiService.loadingStateChanged.next(true)
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result =>  {
            this.uiService.loadingStateChanged.next(false)
            console.log(result)
            
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false)
            this.uiService.showSnackbar(error.message, null, 3000)
        })
    }

    login(authData: AuthData){
        this.uiService.loadingStateChanged.next(true)
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false)
            this.uiService.showSnackbar(error.message, null, 3000)
        })
    }

    logout(){
        this.afAuth.auth.signOut()
    }


    isAuthenticated(){
        return this.isAuthenticated != null
    }

}