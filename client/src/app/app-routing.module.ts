import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './book/book.component';
import {EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'book/:id',
    component: BookComponent
  },
  {
    path: 'book/edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
