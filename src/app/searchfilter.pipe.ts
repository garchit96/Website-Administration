import { Pipe, PipeTransform } from '@angular/core';
import { Users } from './User';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(users: Users[], searchValue:string): Users[] {
   
    if(!users || ! searchValue){
      return users;
    }
   
    return users.filter(Users => 
      Users.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      Users.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
      
  }

}
