import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'angular-image-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from './shared/user-service.service'
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { UserProfileComponent ,DialogContentExampleDialog} from './user-profile/user-profile.component';
import {MatDialogModule} from '@angular/material/dialog';
// var app = angular("myapp", ["backgroundImage"]);

const appRoutes: Routes = [
  // { path: "", redirectTo: "HomePageComponent", pathMatch: "full" },
  { path: "", component: HomePageComponent, pathMatch: "full" },
  { path: "UserProfile/:id", component:UserProfileComponent },
  { path: "find", redirectTo: "search" },
   { path: "home", component: HomePageComponent },
  //  { path: "search", component: SearchComponent },
 { path: "**", component: PageNotFoundComponent }
];


@NgModule({

  entryComponents: [DialogContentExampleDialog],


  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes),
    BrowserAnimationsModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
