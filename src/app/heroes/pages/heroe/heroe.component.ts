import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroeService } from '../../services/heroe.service';

import { switchMap  } from "rxjs/operators";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width:100%;
      border-radius: 5px
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;


  constructor(private router:Router,  private activatedRoute: ActivatedRoute, private heroesService: HeroeService ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroesPorId(id) )
      )  


    .subscribe( heroe => this.heroe = heroe);
    
    
    
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
