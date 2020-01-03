import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialOrigin } from 'app/shared/model/material-origin.model';

@Component({
  selector: 'jhi-material-origin-detail',
  templateUrl: './material-origin-detail.component.html'
})
export class MaterialOriginDetailComponent implements OnInit {
  materialOrigin: IMaterialOrigin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialOrigin }) => {
      this.materialOrigin = materialOrigin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
