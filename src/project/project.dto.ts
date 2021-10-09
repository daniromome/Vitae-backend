import { IsString, IsUrl, IsDate } from 'class-validator'

export class ProjectDTO {
    @IsString()
    public image!: string;

    @IsString()
    public title!: string;

    @IsUrl()
    public url!: string;

    @IsString()
    public summary!: string;

    @IsString()
    public description!: string;

    @IsUrl()
    public repository!: string;

    @IsDate()
    public date!: Date;
}
