// TODO: reemplazar por la API cuando exista. Las fotos son de relleno: poner las reales en public/images/adoption/.
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
  rescued: boolean;
  description: string;
  photos: string[];
};

const PHOTOS = [1, 2, 3].map((n) => `/images/adoption/placeholder-${n}.svg`);

export const ADOPTABLE: AdoptablePet[] = [
  { id: "1", name: "Monchi", age: "5 meses", species: "dog", breed: "Mestizo", sex: "male", size: "small", vaccinated: true, sterilized: false, rescued: true, description: "El perrito es recién llegado, recogido de la calle. Ya fue vacunado y busca un hogar.", photos: PHOTOS },
  { id: "2", name: "Canela", age: "2 años", species: "dog", breed: "Labrador mestizo", sex: "female", size: "large", vaccinated: true, sterilized: true, rescued: false, description: "Cariñosa y juguetona. Se lleva bien con niños y con otros perros.", photos: PHOTOS },
  { id: "3", name: "Rocky", age: "1 año", species: "dog", breed: "Bulldog francés", sex: "male", size: "medium", vaccinated: true, sterilized: true, rescued: false, description: "Muy activo, necesita paseos diarios.", photos: PHOTOS },
  { id: "4", name: "Nube", age: "3 años", species: "dog", breed: "Maltés", sex: "female", size: "small", vaccinated: true, sterilized: true, rescued: false, description: "Tranquila y sociable. Ideal para departamento.", photos: PHOTOS },
  { id: "5", name: "Tobi", age: "8 meses", species: "dog", breed: "Schnauzer", sex: "male", size: "small", vaccinated: true, sterilized: false, rescued: false, description: "Cachorro curioso, vacunado y desparasitado.", photos: PHOTOS },
  { id: "6", name: "Pelusa", age: "1 año", species: "cat", breed: "Europeo", sex: "female", size: "small", vaccinated: true, sterilized: true, rescued: false, description: "Gata independiente pero cariñosa. Convive bien con otros gatos.", photos: PHOTOS },
];
