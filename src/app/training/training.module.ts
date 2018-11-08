import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { AddTrainingComponent } from './new-training/add-training/add-training.component';
import { DeleteTrainingComponent } from './new-training/delete-training/delete-training.component';

@NgModule({
    declarations: [
        TrainingComponent, 
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        AddTrainingComponent,
        DeleteTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule
    ],
    exports: []   
})

export class TrainingModule {

}