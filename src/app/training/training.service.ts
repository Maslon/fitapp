import { Injectable } from '@angular/core';
import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs';

@Injectable({providedIn:"root"})

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ]
    ongoingExcercise = new Subject<Exercise>()
    private runningExercise: Exercise
    exercises: Exercise[] = []

    getExercises(){
        return this.availableExercises.slice()
    }
    

    startExercise(selectedId: string){
        this.runningExercise = this.availableExercises.find(excercise => excercise.id === selectedId)
        this.ongoingExcercise.next({...this.runningExercise})
    }

    completeExercise(){
        this.exercises.push({...this.runningExercise, date: new Date(), state: "completed"})
        this.runningExercise = null
        this.ongoingExcercise.next(null)
    }

    cancelExercise(progress){
        this.exercises.push({
            ...this.runningExercise,
            duration: Math.round(this.runningExercise.duration/progress),
            calories: Math.round(this.runningExercise.calories/progress), 
            date: new Date(), 
            state: "canceled"})
        this.runningExercise = null
        this.ongoingExcercise.next(null)
        console.log(this.exercises)
    }

    getRunningExercise(){
        return {...this.runningExercise}
    }
}