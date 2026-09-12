export interface GetLocationByPostalCode {
    latitude?: string;
    longitude?: string;
    placename?: string;
    state?: string;
    stateabbreviation?: string;
}
export interface GetLocationByPostalCodeListMatch {
    country: string;
    postal_code: string;
}
export interface GetPostalCodesByCity {
    latitude?: string;
    longitude?: string;
    placename?: string;
    postcode?: string;
}
export interface GetPostalCodesByCityListMatch {
    city: string;
    country: string;
    state: string;
}
