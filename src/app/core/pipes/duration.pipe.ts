import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  pure: true
})
export class DurationPipe implements PipeTransform {
  public transform(duration: string): string {
    const durationInt = parseInt(duration, 10);
    if (!durationInt) {
      return '0m';
    }

    const hours = Math.floor(durationInt / 60);
    const minutes = durationInt % 60;

    return hours === 0 ?
      `${minutes}m` : `${hours}h ${minutes}m`;
  }
}
