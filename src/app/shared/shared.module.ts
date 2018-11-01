import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    exports: [
        FormsModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ]
})

export class SharedModule {

}