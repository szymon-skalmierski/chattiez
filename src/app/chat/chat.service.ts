import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SendBird from 'sendbird';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  chatGroups = new BehaviorSubject<SendBird.GroupChannelCollection | null>(
    null
  );

  constructor(private authService: AuthService) {
  }

  getMyGroupChannels() {
    const listQuery =
      this.authService.sb.GroupChannel.createMyGroupChannelListQuery();
    listQuery.includeEmpty = true;
    listQuery.memberStateFilter = 'joined_only';
    listQuery.order = 'latest_last_message';
    listQuery.limit = 10;
    if (listQuery.hasNext) {
      listQuery.next((groupChannels: any, error: any) => {
        this.chatGroups.next(groupChannels);
      });
    }
  }
}
