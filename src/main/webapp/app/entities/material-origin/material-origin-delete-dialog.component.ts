import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaterialOrigin } from 'app/shared/model/material-origin.model';
import { MaterialOriginService } from './material-origin.service';

@Component({
  templateUrl: './material-origin-delete-dialog.component.html'
})
export class MaterialOriginDeleteDialogComponent {
  materialOrigin?: IMaterialOrigin;

  constructor(
    protected materialOriginService: MaterialOriginService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materialOriginService.delete(id).subscribe(() => {
      this.eventManager.broadcast('materialOriginListModification');
      this.activeModal.close();
    });
  }
}
