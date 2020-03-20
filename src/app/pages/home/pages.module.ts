import { ComponentsModule } from './../../components/components.module';
import { HomePageComponent } from './home.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    ComponentsModule
  ],
  providers: []
})
export class PagesModule { }
