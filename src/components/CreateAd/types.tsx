export interface IModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface ICar {
  owner: string,
  imgSourceBase64: string,
  mark: string,
  model: string,
  fuel: string,
  doors: string,
  transmission: string,
  seats: string,
  baggageCapacity: string,
  capacity: string,
}
