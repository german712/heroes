import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface PaginationTableData {
  pageSize: number;
  total: number;
  offset: number;
}
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
  @Output() updatePage = new EventEmitter();
  @Input() pagination: PaginationTableData;
  constructor() {}

  ngOnInit(): void {}
  public onPageSizeChange(event: any): void {
    this.pagination.total = event.length;
    this.pagination.offset = event.pageIndex + 1;
    this.pagination.pageSize = event.pageSize;
    this.updatePage.emit(this.pagination);
  }
}
