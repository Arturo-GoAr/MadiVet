export type AdoptablePet = {
  id: string;
  name: string;
  age: string;
  species: "dog" | "cat";
  breed: string;
  sex: "male" | "female";
  size: "small" | "medium" | "large";
  vaccinated: boolean;
  sterilized: boolean;
  // DESACTIVADO: aún no funciona por el backend (la API de adopción no devuelve `rescued`).
  // rescued: boolean;
  description: string;
  photos: string[];
};
