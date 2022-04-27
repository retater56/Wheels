export interface ICar {
  id: string;
  mark: string;
  model: string;
  imageSource: string;
  imgSourceBase64?: string;
  fuel: string;
  vehicleType: string;
  transmission: string;
  seats: string;
  maxSpeed: string;
  capacity: string;
  cost: string;
  description: string;
  position: string;
  facilities: string[];
}

export interface Navigation {
  [desc: string]: any;
}
