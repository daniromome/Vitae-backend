import { IsDivisibleBy, IsNumber, IsString, Max, Min } from 'class-validator'

export class SkillDTO {
  @IsString()
  public language: string;

  @IsNumber()
  @IsDivisibleBy(0.5)
  @Min(0)
  @Max(5)
  public expertise: number;

  @IsString()
  public icon: string;
}
