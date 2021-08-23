import { IsDivisibleBy, IsMongoId, IsNumber, IsString, Max, Min, IsOptional } from 'class-validator'

class SkillDTO {
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

class ModifySkillDTO {
    @IsMongoId()
    public _id: string;

    @IsString()
    @IsOptional()
    public language: string;

    @IsNumber()
    @IsDivisibleBy(0.5)
    @Min(0)
    @Max(5)
    @IsOptional()
    public expertise: number;

    @IsString()
    @IsOptional()
    public icon: string;
}

export {
  SkillDTO,
  ModifySkillDTO
}
