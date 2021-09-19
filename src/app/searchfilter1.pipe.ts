import { Pipe, PipeTransform } from '@angular/core';
import { UserGroups } from './usergroups';

@Pipe({
  name: 'searchfilter1'
})
export class Searchfilter1Pipe implements PipeTransform {

  transform(groups: UserGroups[], searchValue1:string): UserGroups[] {
    if(!groups || ! searchValue1){
      return groups;
    }
    
    return groups.filter(UserGroups => 
      UserGroups.name.toLocaleLowerCase().includes(searchValue1.toLocaleLowerCase()) ||
      UserGroups.email.toLocaleLowerCase().includes(searchValue1.toLocaleLowerCase())
      );
  }

}
