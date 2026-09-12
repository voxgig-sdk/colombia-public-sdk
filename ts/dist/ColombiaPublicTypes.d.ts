export interface Airport {
    cityId?: number;
    code?: string;
    departmentId?: number;
    id?: number;
    latitude?: number;
    longitude?: number;
    name?: string;
    type?: string;
}
export interface AirportLoadMatch {
    id: number;
}
export interface AirportListMatch {
    cityId?: number;
    code?: string;
    departmentId?: number;
    id?: number;
    latitude?: number;
    longitude?: number;
    name?: string;
    type?: string;
}
export interface CategoryNaturalArea {
    description?: string;
    id?: number;
    name?: string;
}
export interface CategoryNaturalAreaListMatch {
    description?: string;
    id?: number;
    name?: string;
}
export interface ConstitutionArticle {
    articleNumber?: number;
    chapter?: string;
    description?: string;
    id?: number;
    title?: string;
}
export interface ConstitutionArticleLoadMatch {
    id: number;
}
export interface ConstitutionArticleListMatch {
    articleNumber?: number;
    chapter?: string;
    description?: string;
    id?: number;
    title?: string;
}
export interface Country {
    capital?: string;
    currency?: string;
    flag?: string;
    id?: number;
    languages?: any[];
    name?: string;
    population?: number;
    surface?: number;
}
export interface CountryListMatch {
    capital?: string;
    currency?: string;
    flag?: string;
    id?: number;
    languages?: any[];
    name?: string;
    population?: number;
    surface?: number;
    $action?: string;
    [action: string]: any;
}
export interface Department {
    cityCapital?: string;
    description?: string;
    id?: number;
    municipalities?: number;
    name?: string;
    population?: number;
    regionId?: number;
    surface?: number;
}
export interface DepartmentLoadMatch {
    id: number;
}
export interface DepartmentListMatch {
    cityCapital?: string;
    description?: string;
    id?: number;
    municipalities?: number;
    name?: string;
    population?: number;
    regionId?: number;
    surface?: number;
}
export interface Holiday {
    date?: string;
    description?: string;
    id?: number;
    name?: string;
    type?: string;
}
export interface HolidayLoadMatch {
    id: number;
}
export interface HolidayListMatch {
    date?: string;
    description?: string;
    id?: number;
    name?: string;
    type?: string;
}
export interface InvasiveSpecie {
    id?: number;
    impact?: string;
    manage?: string;
    name?: string;
    scientificName?: string;
    urlImage?: string;
}
export interface InvasiveSpecieLoadMatch {
    id: number;
}
export interface InvasiveSpecieListMatch {
    id?: number;
    impact?: string;
    manage?: string;
    name?: string;
    scientificName?: string;
    urlImage?: string;
}
export interface MapType {
    departmentId?: number;
    description?: string;
    id?: number;
    name?: string;
    urlImages?: any[];
}
export interface MapListMatch {
    departmentId?: number;
    description?: string;
    id?: number;
    name?: string;
    urlImages?: any[];
}
export interface NativeCommunity {
    departmentId?: number;
    description?: string;
    id?: number;
    name?: string;
    population?: number;
}
export interface NativeCommunityLoadMatch {
    id: number;
}
export interface NativeCommunityListMatch {
    departmentId?: number;
    description?: string;
    id?: number;
    name?: string;
    population?: number;
}
export interface NaturalArea {
    areaGroupId?: number;
    categoryNaturalAreaId?: number;
    departmentId?: number;
    description?: string;
    id?: number;
    landArea?: number;
    maritimeArea?: number;
    name?: string;
}
export interface NaturalAreaLoadMatch {
    id: number;
}
export interface NaturalAreaListMatch {
    areaGroupId?: number;
    categoryNaturalAreaId?: number;
    departmentId?: number;
    description?: string;
    id?: number;
    landArea?: number;
    maritimeArea?: number;
    name?: string;
}
export interface President {
    description?: string;
    endPeriodDate?: string;
    id?: number;
    image?: string;
    name?: string;
    politicalParty?: string;
    startPeriodDate?: string;
}
export interface PresidentLoadMatch {
    id: number;
}
export interface PresidentListMatch {
    description?: string;
    endPeriodDate?: string;
    id?: number;
    image?: string;
    name?: string;
    politicalParty?: string;
    startPeriodDate?: string;
}
export interface Radio {
    band?: string;
    frequency?: string;
    id?: number;
    name?: string;
    url?: string;
}
export interface RadioLoadMatch {
    id: number;
}
export interface RadioListMatch {
    band?: string;
    frequency?: string;
    id?: number;
    name?: string;
    url?: string;
}
export interface Region {
    departments?: any[];
    description?: string;
    id?: number;
    name?: string;
}
export interface RegionLoadMatch {
    id: number;
}
export interface RegionListMatch {
    departments?: any[];
    description?: string;
    id?: number;
    name?: string;
}
export interface TouristicAttraction {
    city?: string;
    description?: string;
    id?: number;
    images?: any[];
    latitude?: number;
    longitude?: number;
    name?: string;
}
export interface TouristicAttractionLoadMatch {
    id: number;
}
export interface TouristicAttractionListMatch {
    city?: string;
    description?: string;
    id?: number;
    images?: any[];
    latitude?: number;
    longitude?: number;
    name?: string;
}
export interface TypicalDish {
    departmentId?: number;
    description?: string;
    id?: number;
    ingredients?: any[];
    name?: string;
    urlImage?: string;
}
export interface TypicalDishLoadMatch {
    id: number;
}
export interface TypicalDishListMatch {
    departmentId?: number;
    description?: string;
    id?: number;
    ingredients?: any[];
    name?: string;
    urlImage?: string;
}
