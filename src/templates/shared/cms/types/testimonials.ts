export type Testimonial = {
  id: string;
  quote: string;
  personName: string;
  personRole?: string;
  companyName?: string;
  sortOrder?: number;
};

export type TestimonialsCollection = {
  items: Testimonial[];
};
