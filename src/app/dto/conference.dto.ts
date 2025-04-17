import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrganizeConferenceDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  seats: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}