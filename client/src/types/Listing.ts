export default interface Listing {
  id: number;
  type: string;
  imageSrc: string;
  title: string;
  description: string;
  price: number | null;
  location: string;
  details: string[];
}
