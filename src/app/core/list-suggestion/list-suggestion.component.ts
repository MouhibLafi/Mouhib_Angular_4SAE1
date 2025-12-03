import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchTerm: string = '';
  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestions = this.suggestionService.getAll();
    this.favorites = this.suggestions.filter(s => s.isFavorite);
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm.trim()) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
    );
  }

  likeSuggestion(suggestion: Suggestion) {
    this.suggestionService.like(suggestion.id);
    // refresh local view
    this.suggestions = this.suggestionService.getAll();
  }

  addToFavorites(suggestion: Suggestion) {
    this.suggestionService.addToFavorites(suggestion.id);
    this.suggestions = this.suggestionService.getAll();
    this.favorites = this.suggestions.filter(s => s.isFavorite);
  }
}