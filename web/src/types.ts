export type Point = { x: number; y: number };
export interface DataState{
    voltage:Point[]
    current:Point[]
    temperature:Point[]
  }

 export interface INIT  {
    _id?: number;
    voltage: number;
    current: number;
    temperature: number;
    date: number;
    _v?: number;
  };