import { RegisterComponent } from './auth/register/register.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "training", component: TrainingComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}