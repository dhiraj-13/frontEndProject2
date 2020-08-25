import { Component, OnInit, Inject } from "@angular/core";
import { UserServiceService } from "../shared/user-service.service";
import { user } from "../model/use.model";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA, MatChipInputEvent } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Observable, interval } from "rxjs";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  userData: any = [];

  mockUrl: string = "http://localhost:3000/user/";
  constructor(
    private userService: UserServiceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    // this.userService.statusUpdated.subscribe(
    //   (status) => this.userData=status
    // );
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    this.getUser(id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: this.userData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUser(id) {
    return this.http.get(this.mockUrl + id).subscribe((data: any) => {
      this.userData.push(data);
      console.log(this.userData);
    });
  }
}
@Component({
  selector: "dialog-content-example-dialog",
  templateUrl: "./dialog-content-example-dialog.html",
})
export class DialogContentExampleDialog {
  constructor(
    private FormBuilder2: FormBuilder,
    private userService: UserServiceService,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dataModule: any,
    private route: ActivatedRoute
  ) {
    this.getCountryList();
    this.getStateList();
  }
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  signUpForm: FormGroup;
  abc = 50;
  nameId: Number;
  countryList: any;
  stateList: any;
  label: boolean = false;
  company: boolean = false;
  home: boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // hobbies = [
  //   {name: 'Cricket'},
  //   {name: 'Football'},
  //   {name: 'Hockey'},
  // ];
  index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;
  // imagesUrl = [
  //   "https://picsum.photos/id/402/2500/1667",
  //   "https://picsum.photos/id/301/2500/1667",
  //   "https://picsum.photos/id/302/2500/1667", "https://picsum.photos/id/400/2500/1667"]

  private messages;
  displayedRows$: Observable<any>;
  // private tableData = new MatTableDataSource(messages);

  // dataStatus = new EventEmitter();

  age: any = 25;
  data1: 96;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    // this.getUser(id);
    // this.imagesUrl.forEach((x, index) => {
    //   const image = new Image();
    //   image.onload = (() => {
    //     this.imagesLoaded++;
    //     this.loading = (this.imagesLoaded != this.numImages)
    //   })
    //   image.src = x
    // })
    // interval(5000).subscribe(() => {
    //   if (!this.loading)
    //     this.index = (this.index + 1) % this.numImages
    // })

    // this.displayedRows$ = of(messages)
    // this.imagesUrl = ['favicon.jpg'];
    this.signUpForm = this.FormBuilder2.group({
      firstname: ["",[Validators.required]],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", [Validators.required]],
      age: ["", [Validators.required]],
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      companyAddress1: ["", [Validators.required]],
      companyAddress2: [""],
      homeAddress2: [""],
      homeAddress1: ["", [Validators.required]],
      hobbies: new FormControl(
        ["Football", "Hockey", "Tennis"],
        Validators.required
      ),
      box: ["false"],
    });

    this.getUser(id);

  this.signUpForm.controls['firstname'].setValue(this.dataModule[0].firstname);
  this.signUpForm.controls['lastname'].setValue(this.dataModule[0].lastname);
  this.signUpForm.controls['email'].setValue(this.dataModule[0].email);
  this.signUpForm.controls['mobile'].setValue(this.dataModule[0].mobile);
  this.signUpForm.controls['age'].setValue(this.dataModule[0].age);
  this.signUpForm.controls['country'].setValue(this.dataModule[0].country);
  this.signUpForm.controls['state'].setValue(this.dataModule[0].state);
  this.signUpForm.controls['homeAddress1'].setValue(this.dataModule[0].homeAddress1);
  this.signUpForm.controls['homeAddress2'].setValue(this.dataModule[0].homeAddress2);
  this.signUpForm.controls['companyAddress1'].setValue(this.dataModule[0].companyAddress1);
  this.signUpForm.controls['companyAddress2'].setValue(this.dataModule[0].companyAddress2);



  }
  userData: any = [];

  getUser(id) {
    return this.http.get(this.mockUrl + id).subscribe((data: any) => {
      this.userData.push(data);
      console.log("dhiraj",this.dataModule[0].country);
    });
  }
  get hobbies() {
    return this.signUpForm.get("hobbies");
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.hobbies.setValue([...this.hobbies.value, value.trim()]);
      this.hobbies.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(fruit: string): void {
    const index = this.hobbies.value.indexOf(fruit);

    if (index >= 0) {
      this.hobbies.value.splice(index, 1);
      this.hobbies.updateValueAndValidity();
    }
  }
  postData(signUpForm: any) {
    console.log(signUpForm.controls);
     // this.dataStatus.emit(signUpForm.value)
  }
  get addSkillFormGroup() {
    return this.signUpForm.get("interest") as FormArray;
  }

  initItem() {
    return this.FormBuilder2.group({
      interest: [""],
    });
  }
  addRow() {
    const control = <FormArray>this.signUpForm.controls["itemRows"];
    control.push(this.initItem());
  }

  hhhhhh(value) {
    console.log("value", value);
  }
  getCountryList() {
    this.countryList = this.data;
  }

  getStateList() {
    this.stateList = this.states;
  }

  data: any[] = [
    { value: "", label: "Country" },
    { value: "India", label: "India" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "Uganda", label: "Uganda" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Uganda", label: "Uganda" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
  ];

  states: any[] = [
    { value: "", label: "State" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
  ];

  // abcd(value) {
  //   console.log("iam here")
  //   console.log(value)
  //   switch (value) {
  //     case 'label':
  //       if (this.label == false) {
  //         this.label = true;
  //       } else {
  //         this.label = false;
  //       }
  //       break;
  //     case 'Company':
  //       console.log("gggggggg")
  //       if (this.company == false) {
  //         this.company = true;
  //       } else {
  //         this.company = false;
  //       }
  //       break;
  //     case 'Home':
  //       console.log("gggggggg,")
  //       if (this.home == false) {
  //         this.home = true;
  //       } else {
  //         this.home = false;
  //       }
  //       break;

  //   }
  // }

  // createEmployee(currentUser: user) {
  //   if (currentUser.id === null) {
  //     console.log('Create');
  //     // this.userService.createEmployee(currentUser).subscribe(
  //     //   (data) => {
  //     //     this.userService.getAllEmployee();
  //     //   });
  //   // } else {
  //   //   console.log('Update');
  //   //   this.userService.updateEmployee(currentUser).subscribe(
  //   //     (data) => {
  //   //       this.userService.getAllEmployee();
  //   //     });
  //   // }
  // }}
  mockUrl: string = "http://localhost:3000/user/";
  addMember(signUpForm: user[],id) {
    this.http.put(this.mockUrl + id, signUpForm).subscribe(
      (result: any) => {
        console.log("POST Request is successful ", result);

        this.router.navigateByUrl("/UserProfile/" + result.id);
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }

}
