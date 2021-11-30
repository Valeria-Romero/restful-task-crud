import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  title:string = "";
  allTasks:any[] = [];
  task:any = {};

  updateTask:any={
    title:"",
    description:"",
    completed: false
  };

  newTask:any={
    title:"",
    description:"",
    completed:false
  };

  constructor(private _httpService: TasksService) { }
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void{
    this._httpService.fetchTasks()
    .subscribe((data:any)=>{
      this.allTasks = data;
      console.log("This will get all the tasks");
      console.log(data);
      
    });
  }

  findTask(event:any):void{
    event.preventDefault();
    this.title = event.target.title.value;
    this._httpService.selectTask(this.title)
    .subscribe((data:any) =>{
      this.task = data;
    });
    console.log(this.task);
  }

  createNewTask(event:any):void{
    location.reload();
    this._httpService.createTask(this.newTask)
    .subscribe((data:any) =>{
      console.log(data);
    });
  }

  deleteTask(event:any):void{
    this.title = event.target.title.value;
    console.log("Title", this.title);
    this._httpService.removeTask(this.title)
    .subscribe((data:any) =>{ 
      console.log(data);
    });
    location.reload();
  }

  editTask(event:any):void{
    location.reload();
    this._httpService.editTask(this.title, this.updateTask)
    .subscribe((data:any) =>{
      console.log(data);
    });
  }

}
