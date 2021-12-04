import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface PaginationTableData {
  pageSize: number;
  total: number;
  offset: number;
}
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Output() updatePage = new EventEmitter();
  @Input() pagination: PaginationTableData;
  constructor() {}

  ngOnInit(): void {}
  public onPageSizeChange(event: any): void {
    this.pagination.total = event.length;
    this.pagination.offset = event.pageSize * event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.updatePage.emit(this.pagination);
  }
}
