import { Component, Input } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  @Input() buttonLabel = '<';
  onBack() {
    this.location.back();
  }
}
