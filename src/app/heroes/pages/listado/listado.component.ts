import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card{
      margin-top: 20px;
    }
  `
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];




  constructor( private heroesService : HeroeService ) { }

  
  

  ngOnInit(): void {

    this.heroesService.getHeroes()
      //.subscribe( resp => console.log ( resp ) );
      //.subscribe( console.log );
      .subscribe ( resp => {
        this.heroes = resp;
      });
  }

}
