import { IsString, IsEmail } from 'class-validator'

export class InquiryDTO {
    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    public inquiry: string;
}
