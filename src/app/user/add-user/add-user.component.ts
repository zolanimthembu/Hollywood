import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  @Input() user: any;
  Name = "";
  Surname = "";
  Password = "";
  Email = "";
  Role = false;

  ngOnInit(): void {
    this.Name = this.Name;
    this.Surname =  this.Surname;
    this.Password = this.Password;
    this.Email = this.Email;
    this.Role = this.Role;
  }
  addUser() {
    var user = {
      Name: this.Name,
      Surname: this.Surname,
      Password: this.Password,
      EmailAddress: this.Email,
      Role: this.Role === false ? "User" : "Admin"
    };
    this.service.addUser(user).subscribe(res => {
      alert(res === true ? "Added Successfully" : "Error occured while adding");
    });
  }

}
