import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMaterialOrigin } from 'app/shared/model/material-origin.model';

type EntityResponseType = HttpResponse<IMaterialOrigin>;
type EntityArrayResponseType = HttpResponse<IMaterialOrigin[]>;

@Injectable({ providedIn: 'root' })
export class MaterialOriginService {
  public resourceUrl = SERVER_API_URL + 'api/material-origins';

  constructor(protected http: HttpClient) {}

  create(materialOrigin: IMaterialOrigin): Observable<EntityResponseType> {
    return this.http.post<IMaterialOrigin>(this.resourceUrl, materialOrigin, { observe: 'response' });
  }

  update(materialOrigin: IMaterialOrigin): Observable<EntityResponseType> {
    return this.http.put<IMaterialOrigin>(this.resourceUrl, materialOrigin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaterialOrigin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaterialOrigin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
