import { Component } from '@angular/core';
import { ChatService } from '../../services/chatbot.service';

@Component({
  selector: 'chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent {
  question: string = ''; 
  response: string = ''; 
  loading: boolean = false;

  constructor(private chatService: ChatService) { }

  submitQuestion() {
    this.loading = true;  // Start loading indicator
    this.response = '';   // Clear the previous response

    this.chatService.postQuestion(this.question).subscribe(
      (response: any) => {
        this.loading = false; // Stop loading indicator
        this.response = response.response;
      },
      (error) => {
        this.loading = false; // Stop loading indicator on error
        console.error('Erreur lors de la requête :', error);
      }
    );
  }
}

