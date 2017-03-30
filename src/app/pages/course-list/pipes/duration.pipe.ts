import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  pure: true
})
export class DurationPipe implements PipeTransform {
  public transform(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return hours === 0 ?
      `${minutes}m` : `${hours}h ${minutes}m`;
  }
}
