import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { get } from 'lodash';
import { PaginationTableData } from '../paginator/paginator.component';

export interface TableColumn {
  header: string;
  value?: string;
  width?: string;
  cell?: TemplateRef<any>;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn[];
  @Input() dataSource: any[];
  @Input() paginationData: PaginationTableData;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() updatePage = new EventEmitter();
  displayedColumns: any[];
  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c) => c.value);
  }

  public onUpdatePage(event: any): void {
    this.updatePage.emit(event);
  }

  onDeleteRow(row: any) {
    this.onDelete.emit(row);
  }
  onEditRow(row: any) {
    this.onEdit.emit(row);
  }

  public getObjectValue(row: any, property: string): string {
    return get(row, property, '');
  }
}
