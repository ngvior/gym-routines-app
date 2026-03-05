import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsOptional,
  IsDateString,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfterConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    const propertyName = args.constraints[0];
    const relatedValue = (args.object as any)[propertyName];
    
    // If related value (startTime) is missing, we can't compare.
    // Return true and let @IsNotEmpty handle the missing startTime if needed.
    if (!relatedValue) return true;
    if (!propertyValue) return true; // If endTime is missing, let @IsOptional handle it

    const startTime = new Date(relatedValue);
    const endTime = new Date(propertyValue);

    return endTime.getTime() > startTime.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    const propertyName = args.constraints[0];
    return `${args.property} must be logically after ${propertyName}`;
  }
}

export class CreateWorkoutDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  routineId: number;

  @IsUUID()
  @IsOptional()
  splitId?: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsOptional()
  @Validate(IsAfterConstraint, ['startTime'])
  endTime?: string;
}
