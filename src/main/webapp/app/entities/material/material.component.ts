import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterial } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';
import { MaterialDeleteDialogComponent } from './material-delete-dialog.component';

@Component({
  selector: 'jhi-material',
  templateUrl: './material.component.html'
})
export class MaterialComponent implements OnInit, OnDestroy {
  materials?: IMaterial[];
  eventSubscriber?: Subscription;

  constructor(protected materialService: MaterialService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.materialService.query().subscribe((res: HttpResponse<IMaterial[]>) => {
      this.materials = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMaterials();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMaterial): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMaterials(): void {
    this.eventSubscriber = this.eventManager.subscribe('materialListModification', () => this.loadAll());
  }

  delete(material: IMaterial): void {
    const modalRef = this.modalService.open(MaterialDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.material = material;
  }
}
