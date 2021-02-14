import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroeService } from '../../services/heroe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px; 
    }
  `
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

  constructor(public dialog: MatDialog ,private snackBar: MatSnackBar, private router: Router,private heroesService: HeroeService, private activatesRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    
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
        .subscribe ( heroe => this.mostrarSnakbar( 'Registro actualizado'))

    }else{
      //Crear
      this.heroesService.agregarHeroes( this.heroe )
        .subscribe( resp => {
          this.router.navigate(['/heroes/editar', resp.id]);
          this.mostrarSnakbar( 'Registro Creado');
        } )
      
    }
    
  }

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width:'250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if ( result ) {
          this.heroesService.borrarHeroes (  this.heroe.id )
            .subscribe( resp => {
              this.router.navigate (['/heroes']);
            } );
        }
      }

    )




    
  }

  mostrarSnakbar( mensaje:string ): void {

    this.snackBar.open( mensaje, 'Ok!', {
      duration: 2500 
    } )
  }




}
