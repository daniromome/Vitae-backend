import { IsDivisibleBy, IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';


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

class ModifySkillDTO extends SkillDTO {
    @IsMongoId()
    public _id: string;
}

export {
    SkillDTO,
    ModifySkillDTO
};