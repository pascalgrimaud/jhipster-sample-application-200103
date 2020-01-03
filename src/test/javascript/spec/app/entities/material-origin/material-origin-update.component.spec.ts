import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MaterialOriginUpdateComponent } from 'app/entities/material-origin/material-origin-update.component';
import { MaterialOriginService } from 'app/entities/material-origin/material-origin.service';
import { MaterialOrigin } from 'app/shared/model/material-origin.model';

describe('Component Tests', () => {
  describe('MaterialOrigin Management Update Component', () => {
    let comp: MaterialOriginUpdateComponent;
    let fixture: ComponentFixture<MaterialOriginUpdateComponent>;
    let service: MaterialOriginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MaterialOriginUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MaterialOriginUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MaterialOriginUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MaterialOriginService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MaterialOrigin(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MaterialOrigin();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
