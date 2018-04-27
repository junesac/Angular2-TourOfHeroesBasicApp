import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // We made this service public as we will bind it in html page
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
