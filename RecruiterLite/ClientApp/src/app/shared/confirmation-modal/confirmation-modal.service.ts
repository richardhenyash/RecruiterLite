import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationModalComponent} from "./confirmation-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {
  constructor(public modalService: NgbModal) {
  }
  public confirm(modalTitle: string, modalMessage: string, confirmLabel: string = 'Confirm', cancelLabel: string = 'Cancel', showCloseCross: boolean = true): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.modalMessage = modalMessage;
    modalRef.componentInstance.confirmLabel = confirmLabel;
    modalRef.componentInstance.cancelLabel = cancelLabel;
    modalRef.componentInstance.showCloseCross = showCloseCross;
    return modalRef.result;
  }
}
