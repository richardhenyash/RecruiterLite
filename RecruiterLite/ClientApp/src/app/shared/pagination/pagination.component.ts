import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {pageSizeOptions} from "../../models/PageSizeOptions";
import {PaginationParams} from "../../models/PaginationParams";
import {FormBuilder} from "@angular/forms";
import {cloneDeep} from "lodash";
import {FilterOption} from "../../models/FilterOption";
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  constructor(private fb: FormBuilder) {
  }

  @Input() _paginationParams: PaginationParams = {
    pageIndex: 1,
    pageSize: +pageSizeOptions[2].value,
    count: 0,
    sort: "nameAsc",
  };
  @Input() backButtonLabel: string = '<';
  @Input() nextButtonLabel: string = '>';
  @Input() sort: string = '';
  @Output() updatedPaginationParams = new EventEmitter<PaginationParams>;

  public searchForm = this.fb.group({
    search: "",
  });

  public pageSizeForm = this.fb.group({
    pageSize: pageSizeOptions[2].value,
  });

  public pageSizeOptions: FilterOption[] = pageSizeOptions;
  ngOnInit() {
    if (this.paginationParams && this.paginationParams.search) {
      this.searchForm.controls['search'].patchValue(this.paginationParams.search)
    }
    if (this.paginationParams && this.paginationParams.pageSize) {
      this.pageSizeForm.controls['pageSize'].patchValue(+this.paginationParams.pageSize)
    }
  }
  onSearch(): void {
    let search = this.searchForm.controls['search'].value;
    let updatedPaginationParams = cloneDeep(this.paginationParams);
    if (updatedPaginationParams) {
      if (search) {
        updatedPaginationParams.search = search
      } else {
        delete updatedPaginationParams.search;
      }
      this.paginationParams = updatedPaginationParams;
      this.updatedPaginationParams.emit(updatedPaginationParams);
    }
  }
  onNextPage(): void {
    let updatedPaginationParams = cloneDeep(this.paginationParams);
    if (updatedPaginationParams) {
      if (this.checkNext(updatedPaginationParams.pageIndex, updatedPaginationParams.pageSize, updatedPaginationParams.count)) {
        updatedPaginationParams.pageIndex = updatedPaginationParams.pageIndex + 1;
        this.paginationParams = updatedPaginationParams;
        this.updatedPaginationParams.emit(updatedPaginationParams);
      }
    }
  }
  onPreviousPage(): void {
    let updatedPaginationParams = cloneDeep(this.paginationParams);
    if (updatedPaginationParams) {
      if (this.checkPrevious(updatedPaginationParams.pageIndex)) {
        updatedPaginationParams.pageIndex = updatedPaginationParams.pageIndex - 1;
        this.paginationParams = updatedPaginationParams;
        this.updatedPaginationParams.emit(updatedPaginationParams);
      }
    }
  }
  checkPrevious(index: number | undefined | null) {
    if (index) {
      return index -1 > 0;
    }
    return true;
  }
  checkNext(index: number | undefined | null, pageSize: number | undefined | null, count: number | undefined | null) {
    if (index && pageSize && count) {
      return index + 1 <= Math.ceil(count / pageSize);
    }
    return false;
  }
  checkPagination(pageSize: number | undefined | null, count: number | undefined | null) {
    return !!(pageSize && count && count > pageSize);
  }
  onSelectPageSize(event: any){
    let newPageSize = event.target.value;
    let updatedPaginationParams = cloneDeep(this.paginationParams);
    if (newPageSize && updatedPaginationParams) {
      updatedPaginationParams.pageSize = +newPageSize;
      updatedPaginationParams.pageIndex = 1;
      this.paginationParams = updatedPaginationParams;
      this.updatedPaginationParams.emit(updatedPaginationParams);
    }
  }
  public get paginationParams() {
    return this._paginationParams;
  }
  public set paginationParams(params: PaginationParams | null | undefined) {
    if (params) {
      this._paginationParams = params;
    }
  }
}
