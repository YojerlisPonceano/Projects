import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Router } from '@angular/router';
import { Image } from 'src/app/Interfaces/image';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [FooterComponent, NavBarComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {

  images: Image[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.images = this.localStorageService.getImages();
  }

  imageDetails(image: Image) {
    this.router.navigate(['image-details'], { queryParams: image });
  }
}
