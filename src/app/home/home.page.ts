import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  offset = 0;
  pokemons = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 20;
    }
    this.pokemonService.getPokemon(this.offset).subscribe(res => {
      console.log('result', res);
      this.pokemons = [...this.pokemons, ...res];
      if (event) {
        event.target.complete();
      }
      if (this.offset == 100) {
        this.infinite.disabled = true;
      }
    });
  }

  onSearchChange(e) {
    let value = e.detail.value;
    if (value == '') {
      this.offset = 0;
      this.loadPokemons();
      return;
    }
    this.pokemonService.findPokemon(value).subscribe(res => {
      this.pokemons = [res];
    }, err => {
      this.pokemons = [];
    });
  }

}
