import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { AddImagesComponent } from './Components/add-images/add-images.component';
import { ImageDetailsComponent } from './Components/image-details/image-details.component';

const routerConfig: Routes = [
    {
        path : '',
        component : GalleryComponent,
        title : "Gallery"

    },
    {
        path: 'add-images',
        component : AddImagesComponent,
        title : "Add Images"

    },
    {
        path: 'image-details',
        component: ImageDetailsComponent,
        title: "Image Details"
    }
]

export default routerConfig;