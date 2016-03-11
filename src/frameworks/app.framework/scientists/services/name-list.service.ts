import {Injectable} from 'angular2/core';

@Injectable()
export class NameListService {
  private names: Array<string> = [
    'Edsger Dijkstra',
    'Donald Knuth',
    'Alan Turing',
    'Grace Hopper'
  ];

  public get(): string[] {
    return this.names;
  }
  public add(value: string): void {
    this.names.push(value);
  }
}
