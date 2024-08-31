import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import routerConfig from './app/routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers : [
    provideRouter(routerConfig)
  ]

}).catch((err) => console.error(err));
