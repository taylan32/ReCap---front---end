import { CarDetailDto } from './../models/carDetailDto';
import { Car } from './../models/car';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], filterStatement: string): CarDetailDto[] {

    return filterStatement ? value.filter
    (((c: CarDetailDto) => (c.brandName).toLocaleLowerCase().indexOf(filterStatement) !== -1)) : value
  }

}
