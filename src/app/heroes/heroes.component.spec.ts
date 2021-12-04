import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HEROES } from '../core/mocks/heroes-mock';
import { HeroesServiceMock } from '../core/mocks/heroes-service-mock';
import { HeroesComponent } from './heroes.component';

fdescribe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesServiceMock: HeroesServiceMock;
  let dialog: any;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of(HEROES[0]),
    close: null,
  });
  let model = HEROES[0];
  beforeEach(async () => {
    heroesServiceMock = new HeroesServiceMock();
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialog },
        { provide: MAT_DIALOG_DATA, useValue: model },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    );
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate table when component init', async () => {
    // Assert
    expect(component.heroes).toEqual(HEROES);
  });

  it('should call to update view when pagination change', async () => {
    const spy = spyOn<any>(component, 'updateView');
    heroesServiceMock.getHeroes.and.returnValue(of(HEROES));
    // Act
    component.onPageChange({ total: 4, offset: 0, pageSize: 3 });
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should open the dialog', async () => {
    component.openModal();
    expect(dialogSpy).toHaveBeenCalled();
  });
  it('should open the dialog', async () => {
    component.openAlert('', `You want to delete HERO?`);
    expect(dialogSpy).toHaveBeenCalled();
  });
});
