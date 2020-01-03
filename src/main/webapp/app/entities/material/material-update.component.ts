import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMaterial, Material } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';
import { IMaterialOrigin } from 'app/shared/model/material-origin.model';
import { MaterialOriginService } from 'app/entities/material-origin/material-origin.service';

@Component({
  selector: 'jhi-material-update',
  templateUrl: './material-update.component.html'
})
export class MaterialUpdateComponent implements OnInit {
  isSaving = false;

  materialorigins: IMaterialOrigin[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    origins: []
  });

  constructor(
    protected materialService: MaterialService,
    protected materialOriginService: MaterialOriginService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ material }) => {
      this.updateForm(material);

      this.materialOriginService
        .query()
        .pipe(
          map((res: HttpResponse<IMaterialOrigin[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IMaterialOrigin[]) => (this.materialorigins = resBody));
    });
  }

  updateForm(material: IMaterial): void {
    this.editForm.patchValue({
      id: material.id,
      name: material.name,
      origins: material.origins
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const material = this.createFromForm();
    if (material.id !== undefined) {
      this.subscribeToSaveResponse(this.materialService.update(material));
    } else {
      this.subscribeToSaveResponse(this.materialService.create(material));
    }
  }

  private createFromForm(): IMaterial {
    return {
      ...new Material(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      origins: this.editForm.get(['origins'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterial>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IMaterialOrigin): any {
    return item.id;
  }

  getSelected(selectedVals: IMaterialOrigin[], option: IMaterialOrigin): IMaterialOrigin {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
