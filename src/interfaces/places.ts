
export interface PlacesResponse {
  type:        string;
  query:       number[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          string;
  place_type:    string[];
  relevance:     number;
  properties:    Properties;
  text_es:       string;
  place_name_es: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  address?:      string;
  context?:      Context[];
  bbox?:         number[];
  language_es?:  Language;
  language?:     Language;
}

export interface Context {
  id:           string;
  mapbox_id:    string;
  text_es:      string;
  text:         string;
  wikidata?:    Wikidata;
  language_es?: Language;
  language?:    Language;
  short_code?:  string;
}

export enum Language {
  Es = "es",
}

export enum Wikidata {
  Q1880 = "Q1880",
  Q2170 = "Q2170",
  Q298 = "Q298",
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  accuracy?:   string;
  mapbox_id?:  string;
  wikidata?:   Wikidata;
  short_code?: string;
}
