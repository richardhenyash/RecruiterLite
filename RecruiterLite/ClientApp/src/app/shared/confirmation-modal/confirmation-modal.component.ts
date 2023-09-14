import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent{
  @Input() modalTitle: string = "Would you like to save your changes?";
  @Input() modalMessage: string | undefined;
  @Input() cancelLabel: string = "Cancel";
  @Input() confirmLabel: string = "Confirm";
  @Input() showCloseCross = true;

  @Output() dismiss: EventEmitter<boolean> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) {
  }
  dismissModal(e: boolean): void {
    console.log(e);
    this.dismiss.emit(e);
    this.activeModal.dismiss(e);
  }
  public confirmModal(e: boolean) {
    console.log(e);
    this.activeModal.close(e);
  }
}
