import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  searchTerm: string = '';
  suggestions: Suggestion[] = [];

  constructor(private router: Router, private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestions = this.suggestionService.getAll();
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

  viewDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  likeSuggestion(suggestion: Suggestion): void {
    this.suggestionService.like(suggestion.id);
    this.suggestions = this.suggestionService.getAll();
  }

  addToFavorites(suggestion: Suggestion): void {
    this.suggestionService.addToFavorites(suggestion.id);
    this.suggestions = this.suggestionService.getAll();
  }
}
