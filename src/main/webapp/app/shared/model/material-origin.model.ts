import { IMaterial } from 'app/shared/model/material.model';

export interface IMaterialOrigin {
  id?: number;
  name?: string;
  materials?: IMaterial[];
}

export class MaterialOrigin implements IMaterialOrigin {
  constructor(public id?: number, public name?: string, public materials?: IMaterial[]) {}
}
