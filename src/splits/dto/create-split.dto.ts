import { IsNotEmpty, IsString, IsBoolean, IsUUID } from 'class-validator';

export class CreateSplitDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive: boolean;
}
