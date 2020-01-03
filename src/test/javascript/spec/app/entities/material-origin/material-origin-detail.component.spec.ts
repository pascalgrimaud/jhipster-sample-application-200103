import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MaterialOriginDetailComponent } from 'app/entities/material-origin/material-origin-detail.component';
import { MaterialOrigin } from 'app/shared/model/material-origin.model';

describe('Component Tests', () => {
  describe('MaterialOrigin Management Detail Component', () => {
    let comp: MaterialOriginDetailComponent;
    let fixture: ComponentFixture<MaterialOriginDetailComponent>;
    const route = ({ data: of({ materialOrigin: new MaterialOrigin(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MaterialOriginDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MaterialOriginDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MaterialOriginDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load materialOrigin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.materialOrigin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
