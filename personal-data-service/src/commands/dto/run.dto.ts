import { Min, Max, IsInt } from 'class-validator';

export class RunDto {
  @IsInt()
  @Min(100)
  @Max(120)
  readonly id: number;
}
