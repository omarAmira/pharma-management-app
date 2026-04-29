import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdonnanceService } from 'src/app/core/services/ordonnance.service';
import { MedicamentStock, StockService } from 'src/app/core/services/stock.service';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.scss']
})
export class OrdonnanceComponent implements OnInit {
  ordonnanceForm!: FormGroup;
  patientId!: number;
medicamentsStock: MedicamentStock[] = [];
  constructor(
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private ordonnanceService: OrdonnanceService,
  private stockService: StockService,
  private router: Router
) {}

 ngOnInit(): void {
  this.patientId = +this.route.snapshot.paramMap.get('id')!;
  this.ordonnanceForm = this.fb.group({
    sourceOrdonnance: ['', Validators.required],
    dateOrdonnance: ['', Validators.required],
    dateRdv: [''],
    dureeTraitement: [0, Validators.required],
    medicaments: this.fb.array([]),
  });

  // ✅ Charger les médicaments du stock
  this.stockService.getMedicaments().subscribe(list => this.medicamentsStock = list);
// ✅ Calcul automatique du RDV
  this.ordonnanceForm.get('dateOrdonnance')?.valueChanges.subscribe(() => this.updateDateRdv());
  this.ordonnanceForm.get('dureeTraitement')?.valueChanges.subscribe(() => this.updateDateRdv());
}

updateDateRdv(): void {
  const dateOrdonnance = this.ordonnanceForm.get('dateOrdonnance')?.value;
  const duree = this.ordonnanceForm.get('dureeTraitement')?.value;

  if (dateOrdonnance && duree) {
    const d = new Date(dateOrdonnance);
    d.setMonth(d.getMonth() + duree); // ➕ ajouter les mois
    const rdvStr = d.toISOString().split('T')[0]; // format YYYY-MM-DD
    this.ordonnanceForm.patchValue({ dateRdv: rdvStr }, { emitEvent: false });
  }
}

  get medicaments() {
    return this.ordonnanceForm.get('medicaments') as FormArray;
  }

 addMedicament(): void {
  this.medicaments.push(
    this.fb.group({
      type: ['stock'],           // valeur par défaut
      medicamentStockId: [null],
      nomManuel: [''],
      posologie: [0, Validators.required],
    })
  );
}
removeMedicament(index: number): void {
  this.medicaments.removeAt(index);
}

  submit(): void {
    if (this.ordonnanceForm.invalid) return;

    const dto = {
      patientId: this.patientId,
      ...this.ordonnanceForm.value,
    };

    this.ordonnanceService.createOrdonnance(dto).subscribe(() => {
      alert('Ordonnance créée avec succès');
    });

    this.router.navigate(['/patients']);
  }
}