import { IMaterialOrigin } from 'app/shared/model/material-origin.model';

export interface IMaterial {
  id?: number;
  name?: string;
  origins?: IMaterialOrigin[];
}

export class Material implements IMaterial {
  constructor(public id?: number, public name?: string, public origins?: IMaterialOrigin[]) {}
}
