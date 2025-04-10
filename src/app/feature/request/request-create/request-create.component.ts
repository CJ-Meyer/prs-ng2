import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { RequestCreateDto } from '../../../model/request-create-dto';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  standalone: false,
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = 'Request-Create';
  subscription!: Subscription;
  
  requestDto: RequestCreateDto = {
    userId: 0,
    description: '',
    justification: '',
    dateNeeded: '',
    deliveryMode: ''
  };
  

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('RequestCreateComponent');
    // fake login user assignment
    this.userSvc.getById('1').subscribe(user => {
      this.requestDto.userId = user.id;
      console.log('RequestCreateComponent initialized', this.requestDto);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  add(): void {
    console.log('Adding request DTO:', this.requestDto);
    this.subscription = this.requestSvc.add(this.requestDto).subscribe({
      next: () => this.router.navigateByUrl('/request-list'),
      error: (err) => console.error('Add failed:', err)
    });
  }
  
}
