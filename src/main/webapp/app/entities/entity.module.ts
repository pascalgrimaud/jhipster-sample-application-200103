import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'material',
        loadChildren: () => import('./material/material.module').then(m => m.JhipsterSampleApplicationMaterialModule)
      },
      {
        path: 'material-origin',
        loadChildren: () => import('./material-origin/material-origin.module').then(m => m.JhipsterSampleApplicationMaterialOriginModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
