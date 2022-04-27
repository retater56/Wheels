export interface IModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface ICar {
  id: string;
  imgSourceBase64: string;
  mark: string;
  model: string;
  fuel: string;
  vehicleType: string;
  transmission: string;
  seats: string;
  maxSpeed: string;
  capacity: string;
  cost: string;
  position: string;
  description: string;
  booking: {};
  owner?: string;
  userName?: string;
  rentDate?: string;
  rentTime?: string;
}
