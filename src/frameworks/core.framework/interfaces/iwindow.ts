// standard window interface
export interface IWindow {
  navigator: any;
  location: any;
  alert(msg: string): void;
  confirm(msg: string): void;
}
