import { IsMongoId } from 'class-validator'

export class MongoDTO {
  @IsMongoId()
  public _id!: string
}
