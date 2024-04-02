import { IsString, IsNotEmpty } from 'class-validator'

export class ConnectionDto {
  @IsNotEmpty()
  @IsString()
  host = ''

  @IsNotEmpty()
  @IsString()
  user = ''

  @IsNotEmpty()
  @IsString()
  password = ''

  @IsNotEmpty()
  @IsString()
  database = ''
}
