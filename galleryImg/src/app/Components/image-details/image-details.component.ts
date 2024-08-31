import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Router } from '@angular/router';
import { Image } from 'src/app/Interfaces/image';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-image-details',
  standalone: true,
  imports: [DeleteConfirmationComponent],
  templateUrl: './image-details.component.html',
  styleUrl: './image-details.component.css'
})
export class ImageDetailsComponent implements OnInit {

  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.imageUrl = params['base64Url'];
      this.localStorageService.setImageIdToEliminate(params['id'])
    });
  }

}
