export interface Sighting {
    id:             number;
    witnessName:    string;
    location:       Location;
    description:    string;
    picture:        string;
    status:         string;
    dateTime:       Date;
    witnessContact: string;
}

export interface Location {
    latitude:  number;
    longitude: number;
}