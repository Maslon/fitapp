import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
    declarations: [
        TrainingComponent, 
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule
    ],
    exports: []   
})

export class TrainingModule {

}