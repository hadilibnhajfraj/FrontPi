import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: "chat-bot",
  templateUrl: "./chat-bot.component.html",
  styleUrls: ["./chat-bot.component.css"],
})
export class ChatBotComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild("chatHistory") chatHistory!: ElementRef;

  messages:any;
  userMessage = "";

  sendMessage() {
    if (this.userMessage.trim() !== "") {
      this.messages.push({ content: this.userMessage, from: "user" });
      this.userMessage = "";
      // Simulate bot response
      setTimeout(() => {
        this.messages.push({ content: "This is a bot response.", from: "bot" });
        this.scrollToBottom();
      }, 500);
    }
  }

  scrollToBottom() {
    this.chatHistory.nativeElement.scrollTop =
      this.chatHistory.nativeElement.scrollHeight;
  }
}