import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Message } from '../model/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  @Input() userId: string;
  @Input() userName: string;
  @Input() userRole: string;
  @Input() index: number;
  @Input() notificationCount: number;
  @Input() notifications: any[] = [];
  otherUserId: string = '66702d115ce0d433a260f4cf'; // Dynamic otherUserId input
  @Output() closeChat: EventEmitter<string> = new EventEmitter<string>();
  minimized: boolean = false;
  message: string = '';
  messages: Message[] = [];
  private conversationSubscription: Subscription;
  selectedFile: File | null = null; // New property for selected file
  galleryFiles: File[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscribeToConversation();
    this.fetchConversation();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromConversation();
  }

  toggleMinimize(event: MouseEvent): void {
    event.stopPropagation();
    this.minimized = !this.minimized;
  }

  handleCloseChat(event: MouseEvent): void {
    event.stopPropagation();
    this.closeChat.emit(this.userId);
  }

  preventParentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.galleryFiles = Array.from(event.target.files);
    }
  }
  sendMessage(): void {
    if (this.message.trim() || this.selectedFile) {
      const formData = new FormData();
      formData.append('id_user_envoie', this.userId);
      formData.append('id_user_receive', this.otherUserId);
      formData.append('message', this.message);

      this.galleryFiles.forEach((file, index) => {
        formData.append(`image`, file, file.name);
      });
      this.messageService.addMessage(formData).subscribe(() => {
        this.message = '';
        this.selectedFile = null; // Clear the selected file after sending
        this.fetchConversation(); // Refresh conversation after sending message
      }, (error) => {
        console.error('Error sending message:', error);
      });
    }
  }

  fetchConversation(): void {
    if (this.userId && this.otherUserId) {
      this.messageService.getConversation(this.userId, this.otherUserId).subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        },
        (error) => {
          console.error('Error fetching conversation:', error);
        }
      );
    }
  }

  private subscribeToConversation(): void {
    this.conversationSubscription = this.messageService.onConversationData().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error receiving conversation data:', error);
      }
    );
  }
  getImageSrc(image: any): string {
    return `data:${image.contentType};base64,${this.arrayBufferToBase64(image.data.data)}`;
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
  }
  private unsubscribeFromConversation(): void {
    if (this.conversationSubscription) {
      this.conversationSubscription.unsubscribe();
    }
  }
}
