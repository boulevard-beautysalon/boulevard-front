export interface FaqItem {
  _key?: string;
  _type?: "faqItem";
  question: string;
  answer: string;
}

export interface FaqSection {
  description?: string;
  items?: FaqItem[];
}

export interface HomeFaq {
  _id?: string;
  title?: string;
  faq?: FaqSection;
}

export interface ServicesFaq {
  _id?: string;
  title?: string;
  faq?: FaqSection;
}
