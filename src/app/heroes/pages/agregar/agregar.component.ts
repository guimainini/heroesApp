import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroeService } from '../../services/heroe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id  : 'DC Comics',
      desc: 'DC - Comics' 
    },
    {
      id  : 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(  private router: Router,private heroesService: HeroeService, private activatesRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    
    this.activatesRoute.params
      .pipe( 
        switchMap (({id}) => this.heroesService.getHeroesPorId(id) )
      )
      .subscribe ( heroe => this.heroe = heroe )
      
    

  }

  guardar(){
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }
    
    if( this.heroe.id) {
      //actualizar
      this.heroesService.actualizarHeroes( this.heroe )
        .subscribe ( heroe => console.log( 'Actualizando', heroe ) )

    }else{
      //Crear
      this.heroesService.agregarHeroes( this.heroe )
        .subscribe( resp => {
          this.router.navigate(['/heroes/editar', resp.id])
        } )
      
    }
    



  }

}
