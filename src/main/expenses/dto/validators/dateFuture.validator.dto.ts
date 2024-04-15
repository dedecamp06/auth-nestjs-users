import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isDateNotInFuture', async: false })
export class dateFutureValidator implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    return inputDate <= today;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date cannot be in the future.';
  }
}