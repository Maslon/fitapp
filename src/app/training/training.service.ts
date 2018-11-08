import { UIService } from 'src/app/shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({providedIn: "root"})

export class TrainingService {
  private fbSubs: Subscription[] = []
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>()
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private userId: string;

  constructor(private db: AngularFirestore,
              private uiService: UIService,
              private afAuth: AngularFireAuth){}

  addExercise(name, duration, calories){
    console.log(name, duration, calories)
    this.addToDatabase("availableExercises", {
      name: name,
      duration: duration,
      calories: calories,
      ownedBy: this.userId
    })
  }            

  fetchAvailableExercises() {
    this.afAuth.authState.subscribe(user => this.userId = user.uid)
    this.uiService.loadingStateChanged.next(true)
    this.fbSubs.push(this.db.collection("availableExercises").snapshotChanges()
    .pipe(map((docData) => {
      return docData.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data() 
        }
      })
    })).subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises.filter(exercise => exercise.ownedBy === this.userId)
      this.exercisesChanged.next([...this.availableExercises])
      this.uiService.loadingStateChanged.next(false)
    }, error => {
      this.uiService.loadingStateChanged.next(false)
      this.uiService.showSnackbar("Fetching Exercises failed. please try again later", null, 3000)
      this.exercisesChanged.next(null)
    }))
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
    console.log(this.userId)
  }

  completeExercise() {
    this.addToDatabase("finishedExercises", {
      ...this.runningExercise,
      ownedBy: this.userId,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addToDatabase("finishedExercises" ,{
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      ownedBy: this.userId,
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  deleteAvailableExercise(id: string) {
    this.db.collection("availableExercises").doc(id).delete()
  }

  deletePastExercise(id: string){
    this.db.collection("finishedExercises").doc(id).delete()
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection("finishedExercises").valueChanges().subscribe((exercises: Exercise[]) => { 
      this.finishedExercisesChanged.next(exercises.filter(exercise => exercise.ownedBy === this.userId))
    }))
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addToDatabase(status ,exercise){
    this.db.collection(status).add(exercise)
  }
}
