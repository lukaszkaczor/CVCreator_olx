import { AuthGuard } from "./Guards/auth.guard";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule, disableDebugTools } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { ApiAuthorizationModule } from "src/api-authorization/api-authorization.module";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { AuthorizeInterceptor } from "src/api-authorization/authorize.interceptor";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { ProgressbarComponent } from "./Components/progressbar/progressbar.component";
import { PersonalDataFormComponent } from "./Components/personal-data-form/personal-data-form.component";
import { ImageFormComponent } from "./Components/image-form/image-form.component";
import { CookieService } from "ngx-cookie-service";
import { AddressFormComponent } from "./Components/address-form/address-form.component";
import { ContactFormComponent } from "./Components/contact-form/contact-form.component";
import { CreatorNavigationComponent } from "./Components/creator-navigation/creator-navigation.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { BasicInfoComponent } from "./Components/basic-info/basic-info.component";
import { SocialMediaFormComponent } from "./Components/social-media-form/social-media-form.component";
import { ExperiencePageComponent } from "./Components/experience-page/experience-page.component";
import { WorkExperienceComponent } from "./Components/work-experience/work-experience.component";
import { LoginComponent } from "./Components/login/login.component";
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NavbarComponent,
    ProgressbarComponent,
    PersonalDataFormComponent,
    ImageFormComponent,
    AddressFormComponent,
    ContactFormComponent,
    CreatorNavigationComponent,
    FooterComponent,
    BasicInfoComponent,
    SocialMediaFormComponent,
    ExperiencePageComponent,
    WorkExperienceComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    // RouterModule.forRoot([
    //   { path: "", component: HomeComponent, pathMatch: "full" },
    //   { path: "counter", component: CounterComponent },
    //   {
    //     path: "fetch-data",
    //     component: FetchDataComponent,
    //     canActivate: [AuthorizeGuard],
    //   },
    // ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    CookieService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
