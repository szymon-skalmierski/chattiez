import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomCreateComponent } from './chat-room-create.component';

describe('ChatRoomCreateComponent', () => {
  let component: ChatRoomCreateComponent;
  let fixture: ComponentFixture<ChatRoomCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatRoomCreateComponent]
    });
    fixture = TestBed.createComponent(ChatRoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
