import { Injectable } from '@angular/core';
import { Image } from '../Interfaces/image';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'imagenes';
  imageIdToEliminate : string = '';

  constructor() { }

  // Para almacenar las imagenes en el local storage
  saveImage(image: Image) {
    let images = this.getImages();
    images.push(image);
    localStorage.setItem(this.storageKey, JSON.stringify(images));
  }

  // Para obtener todas las imagenes almacenadas
  getImages(): Image[] {
    const images = localStorage.getItem(this.storageKey);
    return images ? JSON.parse(images) : [];
  }

  // Para eliminar una imagen del local storage
  deleteImage(id: string) {
    let images = this.getImages();
    images = images.filter(image => image.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(images));
  }
  //
  setImageIdToEliminate(imageId: string) {
    this.imageIdToEliminate = imageId;
  }

}

