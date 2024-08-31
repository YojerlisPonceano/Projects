import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { RouterModule } from '@angular/router';
import { Image } from 'src/app/Interfaces/image';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-add-images',
  standalone: true,
  imports: [RouterModule, FooterComponent, NavBarComponent],
  templateUrl: './add-images.component.html',
  styleUrl: './add-images.component.css'
})
export class AddImagesComponent {

  image: Image = {
    id: '',
    base64Url: '',
    title: 'Imagen',
    description: 'Imagen de la galeria de imagenes'
  }
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.image.base64Url = reader.result as string;
        const id = uuidv4();
        this.image.id = id;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit(): void {
  }

  saveNewImage(): void {
    this.image.title = (document.getElementById("image-title") as HTMLInputElement).value;
    if (this.image.id && this.image.title ) {
      this.image.description = (document.getElementById("image-description") as HTMLInputElement).value;
      this.localStorageService.saveImage(this.image);
      this.router.navigate(['']);
    } else {
      alert("Debe subir una imagen y agregar su titulo");
    }
  }
}
