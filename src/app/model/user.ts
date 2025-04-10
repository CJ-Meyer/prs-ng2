export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    isReviewer: boolean;
  
    constructor(
      id: number = 0,
      username: string = '',
      password: string = '',
      firstName: string = '',
      lastName: string = '',
      email: string = '',
      phoneNumber: string = '',
      isAdmin: boolean = false,
      isReviewer: boolean = false
    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.isAdmin = isAdmin;
      this.isReviewer = isReviewer;
    }
  
    details(): string {
      return `User: ${this.id} ${this.username}, ${this.firstName} ${this.lastName}, Email: ${this.email}, Phone: ${this.phoneNumber}, Admin: ${this.isAdmin}, Reviewer: ${this.isReviewer}`;
    }
  }
  