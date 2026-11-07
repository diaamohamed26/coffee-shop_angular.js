import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  values = [
    {
      number: '01',
      title: 'Quality First',
      description:
        'We carefully select our coffee beans and work with quality ingredients to create a memorable cup.',
      icon: '✳',
    },
    {
      number: '02',
      title: 'Made with Passion',
      description:
        'Every cup is prepared with attention, creativity, and a genuine love for great coffee.',
      icon: '♡',
    },
    {
      number: '03',
      title: 'A Place to Connect',
      description:
        'We believe coffee brings people together. Our space is designed for conversations and good moments.',
      icon: '⌂',
    },
  ];

  milestones = [
    {
      year: 'THE IDEA',
      title: 'A love for coffee',
      description:
        'A simple idea inspired by the beauty of slowing down and enjoying the little things.',
    },
    {
      year: 'THE CRAFT',
      title: 'Finding our flavor',
      description:
        'Exploring coffee origins, flavors, brewing methods, and the details that make every cup special.',
    },
    {
      year: 'THE EXPERIENCE',
      title: 'More than a coffee shop',
      description:
        'Creating a welcoming coffee experience where every visit feels a little more special.',
    },
  ];
}