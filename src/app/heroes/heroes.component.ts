import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { HeroesService } from '../core/services/heroes.service';
import { LoadingService } from '../core/services/loading.service';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { PaginationTableData } from '../shared/components/paginator/paginator.component';
import { TableColumn } from '../shared/components/table/table.component';
import { Hero } from '../shared/models/hero-model';
import { HeroesFormComponent } from './heroes-form/heroes-form.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  @ViewChild('actionColumn') actionColumn: TemplateRef<HTMLDivElement>;
  heroes: Hero[];
  unsubscribe$ = new Subject<void>();
  destroyDialog$: Subject<any> = new Subject<void>();
  columns: TableColumn[];
  loading: Observable<boolean>;
  pagination: PaginationTableData = { total: 10, offset: 0, pageSize: 10 };
  searchField: FormControl = new FormControl();
  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
    this.columns = [
      { header: 'NAME', value: 'name' },
      { header: 'DESCRIPTION', value: 'description' },
      { header: 'AGE', value: 'age', width: '20%' },
      { header: 'WEAKNESS', value: 'weakness' },
      { header: '', value: 'actions', width: '10%' },
    ];
    this.updateView();
    this.searchField.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(300))
      .subscribe((term) => {
        this.pagination.offset = 0;
        this.updateView();
      });
  }

  async onDeleteRow(hero: Hero) {
    if (await this.openAlert('', `You want to delete ${hero.name}?`)) {
      this.heroesService
        .deleteHero(hero.id!)
        .subscribe(() => this.updateView());
    }
  }
  async openAlert(message: string, title?: string): Promise<string> {
    return this.dialog
      .open(ConfirmModalComponent, {
        minWidth: 325,
        data: {
          buttons: ['confirm'],
          title: title,
          body: message,
        },
      })
      .afterClosed()
      .toPromise();
  }

  onPageChange(pagination: any): void {
    this.pagination.total = pagination.total;
    this.pagination.pageSize = pagination.pageSize;
    this.pagination.offset = pagination.offset;
    this.updateView();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
    this.destroyDialog$.unsubscribe();
  }

  updateView() {
    this.heroesService
      .getHeroes({
        filters: { name: this.searchField.value },
        offset: this.pagination.offset,
        count: this.pagination.pageSize,
      })
      .pipe()
      .subscribe((res) => {
        this.pagination.total = res.total;
        this.heroes = res.data;
      });
  }

  submit(hero: Hero) {
    if (hero.id) {
      this.heroesService.updateHero(hero).subscribe(() => this.updateView());
    } else {
      this.heroesService.createHero(hero).subscribe(() => this.updateView());
    }
  }

  openModal(hero?: Hero) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.height = '55%';
    dialogConfig.panelClass = 'dynamic-form-dialog-container';
    dialogConfig.data = hero;

    this.dialog
      .open(HeroesFormComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntil(this.destroyDialog$))
      .subscribe((data) => {
        if (data) this.submit(data);
      });
  }
}
