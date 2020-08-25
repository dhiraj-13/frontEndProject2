import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms'
import { user } from '../model/use.model';
import {UserServiceService } from"../shared/user-service.service";
import {MatButtonModule} from '@angular/material/button';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableModule, MatTableDataSource, MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import {  forkJoin, interval, of } from 'rxjs'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { switchMap, catchError } from 'rxjs/operators'
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private FormBuilder2: FormBuilder,private userService:UserServiceService,private http: HttpClient, private router: Router) { this.getCountryList();this.getStateList() }
  // public imagesUrl;
  signUpForm: FormGroup;
  abc = 50; nameId: Number; countryList: any; stateList:any
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
  selectedFile = null;
  imagesUrl = [
    "https://picsum.photos/id/402/2500/1667",
    "https://picsum.photos/id/301/2500/1667",
    "https://picsum.photos/id/302/2500/1667", "https://picsum.photos/id/400/2500/1667"]

dhiraj :any


  private messages;
  displayedRows$: Observable<any>;
  // private tableData = new MatTableDataSource(messages);
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  namePattern = "^[a-zA-z]{2,20}$";
  // dataStatus = new EventEmitter();
  imagePreview: string;
  age: any = 25;
  data1: 96
  ngOnInit() {

    this.imagesUrl.forEach((x, index) => {
      const image = new Image();
      image.onload = (() => {
        this.imagesLoaded++;
        this.loading = (this.imagesLoaded != this.numImages)
      })
      image.src = x
    })
    interval(5000).subscribe(() => {
      if (!this.loading)
        this.index = (this.index + 1) % this.numImages
    })



    // this.displayedRows$ = of(messages)
    // this.imagesUrl = ['favicon.jpg'];
    this.signUpForm = this.FormBuilder2.group({
      firstname: ['', [Validators.required,Validators.pattern(this.namePattern)]],
      lastname: ['', Validators.required,,Validators.pattern(this.namePattern)],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]
    ],
      age:['25',[Validators.required]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      companyAddress1:['',[Validators.required]],
      companyAddress2:[''],
      homeAddress2:[''],
      homeAddress1:['',[Validators.required]],
      hobbies: new FormControl([
        'Football',
        'Hockey',
        'Tennis',

      ], Validators.required),
      box:['false'],
      // image: new FormControl(null, {
      //   validators: [Validators.required],
      //   asyncValidators: [mimeType]
      // })
    })
  }


  get hobbies() {
    return this.signUpForm.get('hobbies');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.hobbies.setValue([...this.hobbies.value, value.trim()]);
      this.hobbies.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.hobbies.value.indexOf(fruit);

    if (index >= 0) {
      this.hobbies.value.splice(index, 1);
      this.hobbies.updateValueAndValidity();
    }
  }
  postData(signUpForm:any){

    // console.log(signUpForm.controls);
    // console.log("dhiraj",signUpForm.value)
    // this.dataStatus.emit(signUpForm.value)

  }
  get addSkillFormGroup() {
    return this.signUpForm.get('interest') as FormArray;
  }

  initItem() {
    return this.FormBuilder2.group({
      interest: ['']
    })
  }
  addRow() {
    const control = <FormArray>this.signUpForm.controls['itemRows'];
    control.push(this.initItem())
  }

  hhhhhh(value) {
    console.log("value", value)
  }
  getCountryList() {
    this.countryList = this.data;
  }

  getStateList(){
    this.stateList =this.states
  }

  data: any[] = [
    {value: '', label : 'Country'},
    {value: 'India', label : 'India'},
    {value: 'Uganda', label : 'Uganda'},
    {value: 'Ukraine', label : 'Ukraine'},
    {value: 'Uganda', label : 'Uganda'},
    {value: 'United Arab Emirates', label : 'United Arab Emirates'},
    {value: 'Uganda', label : 'Uganda'},
    {value: 'Uruguay', label : 'Uruguay'},
    {value: 'Uzbekistan', label : 'Uzbekistan'},

  ]


  states: any[] = [
    {value: '', label : 'State'},
    {value: 'Goa', label : 'Goa'},
    {value: 'Gujarat', label : 'Gujarat'},
    {value: 'Haryana', label : 'Haryana'},
    {value: 'Maharashtra', label : 'Maharashtra'},
    {value: 'Punjab', label : 'Punjab'},
    {value: 'Rajasthan', label : 'Rajasthan'},


  ]


  onImagePicked(event) {

    console.log("event",event);
    this.selectedFile = event.target.files[0];
    console.log("this.selectedFile", this.selectedFile);


    const file = (event.target as HTMLInputElement).files[0];
    this.signUpForm.patchValue({ image: file });
    this.signUpForm.get("image").updateValueAndValidity;
    // this.signUpForm.controls['image'].setValue(this.imagePreview);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log("imagrpreview", this.imagePreview);
      this.signUpForm.controls['image'].setValue(this.imagePreview);


    };
    reader.readAsDataURL(file);
  }
  mockUrl: string = 'http://localhost:3000/user';
  addMember(signUpForm:user[]) {
    console.log("iam here")
    // this.userService.statusUpdated.emit
    // (this.signUpForm.value)
    this.http.post(this.mockUrl, signUpForm).subscribe(
     ( result:any ) => {
        console.log('POST Request is successful ', result);

        this.router.navigateByUrl('/UserProfile/'+ result.id);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  gotoPage(){
  this.router.navigateByUrl('/UserProfile/1');
}

private base64textString:String="";

  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }
}

