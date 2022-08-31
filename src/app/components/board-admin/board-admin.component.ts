import { User } from 'src/app/models/User';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  currentUser: any;
  Allusers: any = [];
  closeResult = '';
  userForm: FormGroup;
  userUpdateForm: FormGroup;
  @Input() currentuser: User = {
    firstName: '',
    lastName: '',
    email: '',
  };
  constructor(
    private authService: AuthService,
    private users: UsersService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser);
    this.getAllUsers();
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getAllUsers() {
    this.users.getAllUsers().subscribe((content: any) => {
      this.Allusers = content;
    });
  }
  deleteUser(id: any) {
    this.users.deleteUser(id).subscribe({
      next: (res) => {},
      error: (e) => console.error(e),
    });
    this.reloadCurrentRoute();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openAdd(contentAdd: any) {
    this.modalService
      .open(contentAdd, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'save') {
            console.log(this.userForm.value);
            this.users.createUser(this.userForm.value).subscribe({
              next: (res) => {
                console.log(res);
              },
              error: () => {},
            });
          }
          this.reloadCurrentRoute();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
      this.reloadCurrentRoute();
  }
  openDelete(contentDelete: any, id: any) {
    this.modalService
      .open(contentDelete, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.deleteUser(id);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openUpdate(contentUpdate: any, id: any) {
    this.users.getUser(id).subscribe({
      next: (data) => {
        this.currentuser = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
    this.modalService
      .open(contentUpdate, { ariaLabelledBy: 'modal-basic-title2' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'save') {
            const data = {
              firstName: this.currentuser.firstName,
              lastName: this.currentuser.lastName,
              email: this.currentuser.email,
            };
            this.users.updateUser(id, data).subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (e) => console.error(e),
            });
            this.reloadCurrentRoute();
            this.userUpdateForm.reset();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.userUpdateForm.reset();
        }
      );
  }
}
