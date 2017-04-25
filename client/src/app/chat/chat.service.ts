import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:5000';  
  private socket;
  
  sendMessage(message){
    this.socket.emit('add-message', message);    
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      console.info('あたまです');
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        console.info('お、データ来た: '+ JSON.stringify( data ));
        observer.next(data);    
      });
      return () => {
        console.info('いつ呼ばれる？');
        this.socket.disconnect();
      };  
    })     
    console.info('おしりです');
    return observable;
  }  
}