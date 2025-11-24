import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  faq:{question:string,answer:string}[]=[
    {question:"How Can I Order?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
    {question:"What a Delivery Post?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
    {question:"Where Can I Find You?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
    {question:"How Much Delivery Cost?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
    {question:"What Is Our Special Offers?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
    {question:"What Is Our Best Choice?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
    {question:"Delivery Working Hours?",answer:"Lorem ipsum dolor sit amet consectetur. Aliquet egestas at lacus cum nullam commodo eget consequat. Nulla mattis cras in velit scelerisque diam sit phasellus. Sit odio ultricies volutpat elementum egestas a sed ullamcorper. "},
   ]

}
