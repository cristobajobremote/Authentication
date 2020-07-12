
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from '../../projects/ngx-loading/src/public_api';


import { AuthenticationService } from './_services';
import { User } from './_models';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private sanitizer: DomSanitizer
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
public toggleColours(): void {
  this.coloursEnabled = !this.coloursEnabled;

  if (this.coloursEnabled) {
    this.primaryColour = PrimaryRed;
    this.secondaryColour = SecondaryBlue;
  } else {
    this.primaryColour = PrimaryWhite;
    this.secondaryColour = SecondaryGrey;
  }
}
logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
toggleTemplate(): void {
  if (this.loadingTemplate) {
    this.loadingTemplate = null;
  } else {
    this.loadingTemplate = this.customLoadingTemplate;
  }
}
public showAlert(): void {
  alert('ngx-loading rocks!');
}
}
