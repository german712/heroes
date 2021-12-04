import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';

@NgModule({
  declarations: [HeroesComponent, HeroesFormComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class HeroesModule {}
