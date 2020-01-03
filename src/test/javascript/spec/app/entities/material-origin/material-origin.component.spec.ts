import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MaterialOriginComponent } from 'app/entities/material-origin/material-origin.component';
import { MaterialOriginService } from 'app/entities/material-origin/material-origin.service';
import { MaterialOrigin } from 'app/shared/model/material-origin.model';

describe('Component Tests', () => {
  describe('MaterialOrigin Management Component', () => {
    let comp: MaterialOriginComponent;
    let fixture: ComponentFixture<MaterialOriginComponent>;
    let service: MaterialOriginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MaterialOriginComponent],
        providers: []
      })
        .overrideTemplate(MaterialOriginComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MaterialOriginComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MaterialOriginService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MaterialOrigin(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.materialOrigins && comp.materialOrigins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
