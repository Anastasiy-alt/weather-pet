export interface GeocoderResponse {
    response: {
        GeoObjectCollection: GeoObjectCollection;
    };
}

export interface GeoObjectCollection {
    metaDataProperty: {
        GeocoderResponseMetaData: GeocoderResponseMetaData;
    };
    featureMember: FeatureMember[];
}

export interface GeocoderResponseMetaData {
    request: string;
    found: string;
    results: string;
}

export interface FeatureMember {
    GeoObject: GeoObject;
}

export interface GeoObject {
    metaDataProperty: {
        GeocoderMetaData: GeocoderMetaData;
    };
    description: string;
    name: string;
    boundedBy: {
        Envelope: Envelope;
    };
    Point: Point;
}

export interface GeocoderMetaData {
    kind: string;
    text: string;
    precision: string;
    Address: Address;
    AddressDetails: AddressDetails;
}

export interface Address {
    country_code: string;
    postal_code: string;
    formatted: string;
    Components: AddressComponent[];
}

export interface AddressComponent {
    kind: string;
    name: string;
}

export interface AddressDetails {
    Country: Country;
}

export interface Country {
    AddressLine: string;
    CountryNameCode: string;
    CountryName: string;
    AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
    AdministrativeAreaName: string;
    Locality: Locality;
}

export interface Locality {
    LocalityName: string;
    Thoroughfare: Thoroughfare;
}

export interface Thoroughfare {
    ThoroughfareName: string;
    Premise: Premise;
}

export interface Premise {
    PremiseNumber: string;
    PostalCode: PostalCode;
}

export interface PostalCode {
    PostalCodeNumber: string;
}

export interface Envelope {
    lowerCorner: string;
    upperCorner: string;
}

export interface Point {
    pos: string;
}