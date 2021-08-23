import { IsMongoId, IsString, IsOptional, IsUrl, IsDate } from 'class-validator'

export class ProjectDTO {
    @IsString()
    public image: string;

    @IsString()
    public title: string;

    @IsUrl()
    public url: string;

    @IsString()
    public summary: string;

    @IsString()
    public description: string;

    @IsUrl()
    public repository: string;

    @IsDate()
    public date: Date;
}

export class ModifyProjectDTO {
    @IsMongoId()
    public _id: string;

    @IsString()
    @IsOptional()
    public image: string;

    @IsString()
    @IsOptional()
    public title: string;

    @IsUrl()
    @IsOptional()
    public url: string;

    @IsString()
    @IsOptional()
    public summary: string;

    @IsString()
    @IsOptional()
    public description: string;

    @IsUrl()
    @IsOptional()
    public repository: string;

    @IsDate()
    @IsOptional()
    public date: Date;
}
