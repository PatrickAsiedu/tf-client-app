import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private webSocketUrl = environment.webSocketUrl

  constructor() {
    this.socket$ = webSocket(`${this.webSocketUrl}/market-data-service/websocket/market-data`);
    this.socket$.pipe(
      tap({
        error: (error) => console.error('WebSocket error:', error),
        complete: () => console.log('WebSocket connection closed')
      }),
      catchError(err => {
        console.error('WebSocket error:', err);
        throw err;
      })
    ).subscribe();
   }

  private socket$: WebSocketSubject<any>;



  public sendMessage(message: any): void {
    this.socket$.next(message);
  }

  public getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }
}
