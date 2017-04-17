"use strict"; 

import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Users} from '../../../Users';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: 'users.component.html'
})

export class UsersComponent { 
    users: Users[];
    username: string;
    password: string;
    
    constructor(private userService:UserService){
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

    addUser(event){
        event.preventDefault();
        let newUser = {
            username: this.username,
            password: this.password
        }
        
        this.userService.addUser(newUser)
            .subscribe(user => {
                console.log("3-->", user)
                this.users.push(user);
                this.username = '';
                this.password = '';
            });
    }
    
}
