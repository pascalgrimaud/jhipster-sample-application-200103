import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMaterialOrigin, MaterialOrigin } from 'app/shared/model/material-origin.model';
import { MaterialOriginService } from './material-origin.service';

@Component({
  selector: 'jhi-material-origin-update',
  templateUrl: './material-origin-update.component.html'
})
export class MaterialOriginUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected materialOriginService: MaterialOriginService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialOrigin }) => {
      this.updateForm(materialOrigin);
    });
  }

  updateForm(materialOrigin: IMaterialOrigin): void {
    this.editForm.patchValue({
      id: materialOrigin.id,
      name: materialOrigin.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materialOrigin = this.createFromForm();
    if (materialOrigin.id !== undefined) {
      this.subscribeToSaveResponse(this.materialOriginService.update(materialOrigin));
    } else {
      this.subscribeToSaveResponse(this.materialOriginService.create(materialOrigin));
    }
  }

  private createFromForm(): IMaterialOrigin {
    return {
      ...new MaterialOrigin(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialOrigin>>): void {
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
}
