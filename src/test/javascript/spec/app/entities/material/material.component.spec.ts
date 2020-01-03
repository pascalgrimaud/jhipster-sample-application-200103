import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MaterialComponent } from 'app/entities/material/material.component';
import { MaterialService } from 'app/entities/material/material.service';
import { Material } from 'app/shared/model/material.model';

describe('Component Tests', () => {
  describe('Material Management Component', () => {
    let comp: MaterialComponent;
    let fixture: ComponentFixture<MaterialComponent>;
    let service: MaterialService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MaterialComponent],
        providers: []
      })
        .overrideTemplate(MaterialComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MaterialComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MaterialService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Material(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.materials && comp.materials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
