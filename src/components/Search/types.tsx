export interface ICar {
  id: string;
  mark: string;
  model: string;
  imageSource: string;
  imgSourceBase64?: string;
  fuel: string;
  doors: string;
  transmission: string;
  seats: string;
  baggageCapacity: string;
  capacity: string;
  facilities: string[];
}

export interface Navigation {
  [desc: string]: any;
}
