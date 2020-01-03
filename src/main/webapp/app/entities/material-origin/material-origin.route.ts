import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMaterialOrigin, MaterialOrigin } from 'app/shared/model/material-origin.model';
import { MaterialOriginService } from './material-origin.service';
import { MaterialOriginComponent } from './material-origin.component';
import { MaterialOriginDetailComponent } from './material-origin-detail.component';
import { MaterialOriginUpdateComponent } from './material-origin-update.component';

@Injectable({ providedIn: 'root' })
export class MaterialOriginResolve implements Resolve<IMaterialOrigin> {
  constructor(private service: MaterialOriginService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaterialOrigin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((materialOrigin: HttpResponse<MaterialOrigin>) => {
          if (materialOrigin.body) {
            return of(materialOrigin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MaterialOrigin());
  }
}

export const materialOriginRoute: Routes = [
  {
    path: '',
    component: MaterialOriginComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.materialOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MaterialOriginDetailComponent,
    resolve: {
      materialOrigin: MaterialOriginResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.materialOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MaterialOriginUpdateComponent,
    resolve: {
      materialOrigin: MaterialOriginResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.materialOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MaterialOriginUpdateComponent,
    resolve: {
      materialOrigin: MaterialOriginResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.materialOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
