import { Component, OnInit,OnDestroy } from '@angular/core';
import { ChatService }       from './chat.service';

@Component({
  selector: 'chat-component',
  template: `<div *ngFor="let message of messages">
              {{message.text}}
             </div>
             <input [(ngModel)]="message" (keypress)="onPress($event.keyCode)" (keyup.enter)="onEnter($event.keyCode)" /><button (click)="sendMessage()">送信</button>`,
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  enter;
  
  constructor(private chatService:ChatService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  /* ここの情報さ参考にして、IME変換決定のEnterは無視するようにしてみた */
  /* https://garafu.blogspot.jp/2015/09/javascript-ime-enter-event.html */
  onPress(ev){
    if(ev==13){ // IME変換決定のEnterでは、Keypress発生しないらしいよ
      this.enter=true;
    }else{
      this.enter=false;
    }
  }
  onEnter(ev){
    console.info(JSON.stringify(ev));
    if( this.enter ){
      this.chatService.sendMessage(this.message);
      this.message = '';   
    }
    this.enter=false;
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
