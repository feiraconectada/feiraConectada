export interface ProducerCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Producer {
  id: number;
  name: string;
  slug: string;

  description: string;
  location: string | null;

  phone: string | null;
  image: string;

  categories: ProducerCategory[];
}

export interface ProducerCommercializationMethod {
  id: number;
  name: string;
  slug: string;
}

export interface ProducerSocialLink {
  id: number;
  network: string;
  url: string;
}

export interface ProducerListing {
  id: number;
  name: string;
  description: string | null;
  type: "PRODUCT" | "SERVICE";
  price: number | null;
  image: string;
  categoryName: string;
  categorySlug: string;
}

export interface ProducerDetails extends Producer {
  email: string | null;

  hasFixedLocation: boolean;
  address: string | null;

  commercializationMethods: ProducerCommercializationMethod[];
  socialLinks: ProducerSocialLink[];

  listings: ProducerListing[];
}
