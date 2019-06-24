
export class Cell {
  private red = 0;
  private green = 128;
  private blue = 0;
  private INI_COLOR = `rgb(${this.red},${this.green},${this.blue})`;

  private _id: string;
  private _neighbours: Map<string, Cell>;
  private _color: string;
  private _isAlive: boolean;
  private _age: number;
  private _neighboursAlive: number;

  constructor(id: string) {
    this._id = id;
    this._neighbours = new Map();
    this._color = '';
    this._isAlive = false;
    this._age = 0;
    this._neighboursAlive = 0;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  set isAlive(value: boolean) {
    this._isAlive = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get neighboursAlive(): number {
    return this._neighboursAlive;
  }

  get neighbours(): Map<string, Cell> {
    return this._neighbours;
  }

  private dropColors(): void {
    this.red = 0;
    this.green = 128;
    this.blue = 0;
  }

  die(): void {
    this._isAlive = false;
    this._color = '';
    this._age = 0;
    this.dropColors();
  }

  comeToLife(): void {
    this.color = this.INI_COLOR;
    this.isAlive = true;
  }

  grow(): void {
    this._age += 1;
  }

  liveOrDie() {
    if (!this.isAlive) {
      if (this._neighboursAlive === 3) {
        this.comeToLife();
      }
    } else {
      if (this._neighboursAlive < 2 || this._neighboursAlive > 3) {
        this.die();
      } else {
        this.grow();

        this.red = this.red < 250 ? this.red += 5 : 255;
        this.green = this.green > 0 ? this.green -= 2 : 0;

        this.color = `rgb(${this.red},${this.green},${this.blue})`;
      }
    }
  }

  checkNeigboursAlive(): void {
    let counter = 0;
    this._neighbours.forEach((cell: Cell, key: string) =>  {
      if (cell.color !== '') {
        counter++;
      }
    });
    this._neighboursAlive = counter;
  }

  toJSON() {
    if (this.isAlive) {
      return {"_id" : this._id, "_color" : this._color, "_isAlive" : this._isAlive, "_age" : this._age};
    } else {
      return {"_id" : this._id};
    }
  }

}
