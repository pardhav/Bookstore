export interface IOpenLibraryDoc {
  average_rating: string;
  ratings_count: string;
  text_reviews_count: string;
  num_pages: string;
  price: number;
  key: string;
  type: string;
  seed: string[];
  title: string;
  title_suggest: string;
  edition_count: number;
  edition_key: string[];
  publish_date: string[];
  publish_year: number[];
  first_publish_year: number;
  number_of_pages_median: number;
  lccn: string[];
  publish_place: string[];
  oclc: string[];
  contributor: string[];
  lcc: string[];
  ddc: string[];
  isbn: string;
  last_modified_i: number;
  ia: string[];
  ebook_count_i: number;
  has_fulltext: boolean;
  public_scan_b: boolean;
  lending_edition_s: string;
  lending_identifier_s: string;
  printdisabled_s: string;
  cover_edition_key: string;
  cover_i: number;
  first_sentence: string[];
  publisher: string;
  language: string[];
  author_key: string[];
  author_name: string[];
  authors_array: string[];
  author_alternative_name: string[];
  person: string[];
  place: string[];
  subject: string[];
  id_alibris_id: string[];
  id_amazon: string[];
  id_bodleian__oxford_university: string[];
  id_depósito_legal: string[];
  id_goodreads: string[];
  id_google: string[];
  id_hathi_trust: string[];
  id_librarything: string[];
  id_paperback_swap: string[];
  id_wikidata: string[];
  id_yakaboo: string[];
  ia_loaded_id: string[];
  ia_box_id: string[];
  ia_collection_s: string;
  publisher_facet: string[];
  publication_date: string;
  person_key: string[];
  place_key: string[];
  person_facet: string[];
  subject_facet: string[];
  _version_: any;
  place_facet: string[];
  lcc_sort: string;
  author_facet: string[];
  subject_key: string[];
  ddc_sort: string;
  id_amazon_ca_asin: string[];
  id_amazon_co_uk_asin: string[];
  id_amazon_de_asin: string[];
  id_amazon_it_asin: string[];
  id_canadian_national_library_archive: string[];
  id_overdrive: string[];
  id_british_library: string[];
  id_british_national_bibliography: string[];
  id_abebooks_de: string[];
  subtitle: string;
  time: string[];
  time_facet: string[];
  time_key: string[];
  authors: string;
}

export interface IOpenLibrarySearchRes {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Partial<IOpenLibraryDoc>[];
  num_found: number;
  q: string;
  offset?: any;
}
