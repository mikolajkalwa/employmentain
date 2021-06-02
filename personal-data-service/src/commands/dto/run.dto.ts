import { Min, Max, IsInt } from 'class-validator';

export class RunDto {
  @IsInt()
  @Min(100)
  @Max(1200)
  readonly id: number;
}
