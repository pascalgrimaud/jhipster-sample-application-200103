import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { MaterialOriginComponent } from './material-origin.component';
import { MaterialOriginDetailComponent } from './material-origin-detail.component';
import { MaterialOriginUpdateComponent } from './material-origin-update.component';
import { MaterialOriginDeleteDialogComponent } from './material-origin-delete-dialog.component';
import { materialOriginRoute } from './material-origin.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(materialOriginRoute)],
  declarations: [
    MaterialOriginComponent,
    MaterialOriginDetailComponent,
    MaterialOriginUpdateComponent,
    MaterialOriginDeleteDialogComponent
  ],
  entryComponents: [MaterialOriginDeleteDialogComponent]
})
export class JhipsterSampleApplicationMaterialOriginModule {}
