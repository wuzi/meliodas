import { MaterialType, MaterialStatus } from '../entities/material.entity';

export class CreateMaterialDto {
  readonly name: string;
  readonly type: MaterialType;
  readonly patrimonyNumber: string;
  readonly description: string;
  readonly status: MaterialStatus;
  readonly quantity: number | null;
  readonly minimum_quantity: number | null;
}
