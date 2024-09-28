import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinByComma',
  standalone: true
})
export class JoinByCommaPipe implements PipeTransform {
  transform(value: string[]): string {
    if (!Array.isArray(value)) {
      return '';
    }
    return value.join(', ');
  }
}
