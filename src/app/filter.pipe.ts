import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true // Pipe pure, pour de meilleures performances
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText || searchText.trim() === '') return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
        (item.nom && item.nom.toLowerCase().includes(searchText)) ||
        (item.prenom && item.prenom.toLowerCase().includes(searchText)) ||
        (item.email && item.email.toLowerCase().includes(searchText)) ||
        (item.tel && item.tel.includes(searchText)) ||
        (item.filiere && item.filiere.toLowerCase().includes(searchText))
      );
    });
  }
}
