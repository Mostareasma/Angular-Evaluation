import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './list/list.component';
import {HeaderComponent} from './header/header.component';
import {BookComponent} from './book/book.component';
import {EditComponent} from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    HeaderComponent,
    BookComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
