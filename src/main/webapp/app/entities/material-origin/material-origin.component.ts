import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterialOrigin } from 'app/shared/model/material-origin.model';
import { MaterialOriginService } from './material-origin.service';
import { MaterialOriginDeleteDialogComponent } from './material-origin-delete-dialog.component';

@Component({
  selector: 'jhi-material-origin',
  templateUrl: './material-origin.component.html'
})
export class MaterialOriginComponent implements OnInit, OnDestroy {
  materialOrigins?: IMaterialOrigin[];
  eventSubscriber?: Subscription;

  constructor(
    protected materialOriginService: MaterialOriginService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.materialOriginService.query().subscribe((res: HttpResponse<IMaterialOrigin[]>) => {
      this.materialOrigins = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMaterialOrigins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMaterialOrigin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMaterialOrigins(): void {
    this.eventSubscriber = this.eventManager.subscribe('materialOriginListModification', () => this.loadAll());
  }

  delete(materialOrigin: IMaterialOrigin): void {
    const modalRef = this.modalService.open(MaterialOriginDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.materialOrigin = materialOrigin;
  }
}
