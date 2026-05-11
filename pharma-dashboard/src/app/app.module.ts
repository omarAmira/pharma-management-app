import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule }    from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule }    from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule }  from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }       from './app.component';
import { SidebarComponent }   from './layout/sidebar/sidebar.component';
import { HeaderComponent }    from './layout/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StockComponent }     from './pages/stock/stock.component';
import { PatientsComponent }  from './pages/patients/patients.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrdonnanceComponent } from './pages/ordonnances/ordonnance/ordonnance.component';
import { SessionsComponent } from './pages/session/sessions/sessions.component';
import { ScannerModalComponent } from './pages/scanner-modals/scanner-modals.component';
import { MatDialogModule }  from '@angular/material/dialog';
import { OrdonnanceByPatientComponent } from './pages/ordonnance-by-patient/ordonnance-by-patient.component';
import { OrdonnanceListeComponent } from './ordonnance-liste/ordonnance-liste.component'; // ✅ ajouter
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    StockComponent,
    PatientsComponent,
    OrdonnanceComponent,
    SessionsComponent,
    ScannerModalComponent,
    OrdonnanceByPatientComponent,
    OrdonnanceListeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // ✅ obligatoire pour Angular Material
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatRippleModule,
    MatDialogModule ,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}