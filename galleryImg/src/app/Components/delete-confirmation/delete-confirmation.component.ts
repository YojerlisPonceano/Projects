import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent implements OnInit {

  constructor ( 
    private localStorageService: LocalStorageService, 
    private router: Router ) {}

  imageIdToEliminate: string = '';
  @ViewChild('myModal') myModal!: ElementRef;


  ngOnInit() {
    this.imageIdToEliminate = this.localStorageService.imageIdToEliminate;
  }

  deleteImage(id: string) {
    this.localStorageService.deleteImage(id);
    this.closeConfirmationModal();
    this.router.navigate(['']);
  }

  closeConfirmationModal() {
    const modalElement = this.myModal.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}
