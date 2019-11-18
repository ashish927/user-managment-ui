import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: User[];

  searchText;

  closeResult: string;

  addForm: FormGroup;

  enableEdit = false;
  enableEditIndex = null;
  

  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });

      this.addForm = this.formBuilder.group({
        _id: [],
        name: ['',Validators.required],
        email: ['', Validators.required],
        role: ['', Validators.required],
        mobileNo: ['']
      });
  }

 
  onSubmit() {
    console.log("enter here ");
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.ngOnInit()
        this.modalService.dismissAll();
      });
  }

  deleteUser(user: User){
    this.userService.deleteUser(user._id)
    .subscribe(data=>{
      this.ngOnInit()
    });
  }
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

 
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  cancel() {
    console.log('cancel');
    this.enableEditIndex = null;
  }

  saveSegment(user:User) {
    this.enableEditIndex = null;
    this.userService.updateUser(user)
    .subscribe(data=>{
      this.ngOnInit()
    });
  }

}
