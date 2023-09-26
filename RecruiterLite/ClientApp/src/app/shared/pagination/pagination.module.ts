import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination.component";
import { CommonModule } from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
