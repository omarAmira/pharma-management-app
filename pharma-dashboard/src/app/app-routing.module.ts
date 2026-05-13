// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StockComponent }     from './pages/stock/stock.component';
import { PatientsComponent }  from './pages/patients/patients.component';
import { OrdonnanceComponent } from './pages/ordonnances/ordonnance/ordonnance.component';
import { SessionsComponent } from './pages/session/sessions/sessions.component';
import { OrdonnanceByPatientComponent } from './pages/ordonnance-by-patient/ordonnance-by-patient.component';
import { OrdonnanceListeComponent } from './ordonnance-liste/ordonnance-liste.component';
import { StockHistoriqueComponent } from './stock-historique/stock-historique.component';
import { RapportPdfComponent } from './pages/rapport-pdf/rapport-pdf.component';


const routes: Routes = [
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stock',     component: StockComponent },
  { path: 'patients',  component: PatientsComponent },
   { path: 'ordonnances',  component: OrdonnanceListeComponent },
    { path: 'Rapport',  component: RapportPdfComponent },
   { path: 'trace',  component: StockHistoriqueComponent },
   { path: 'ordonnances/create/:id', component: OrdonnanceComponent },
  { path: 'sessions/:id', component: SessionsComponent },  //id de l'ordonnance
  { path: 'patients/:id/ordonnances', component: OrdonnanceByPatientComponent },
  { path: '**',        redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}