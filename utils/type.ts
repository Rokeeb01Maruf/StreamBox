export type movieCardType = {
    id : number,
    title : string,
    poster_path: string,
    release_date: string,
    backdrop_path: string
}

export type movieSectionType = movieCardType[]

export interface MovieGenre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieDetailsType {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    tagline: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    runtime: number | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: MovieGenre[];
    homepage: string | null;
    status: string;
    original_language: string;
    budget: number;
    revenue: number;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
    known_for_department: string;
    popularity: number;
}

export interface MovieCreditsType {
    id: number;
    cast: CastMember[];
}

export interface MovieVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface MovieVideosType {
    id: number;
    results: MovieVideo[];
}

export interface MovieListType {
    page: number;
    results: movieCardType[];
    total_pages: number;
    total_results: number;
}

export type MovieFullDetailsType = {
        movie: MovieDetailsType | null,
        casts: MovieCreditsType | null,
        videos: MovieVideosType | null,
        recommendations: MovieListType | null,
        similar: MovieListType | null
    }

export interface UserType {
    id : string,
    email : string,
    nickname : string,
    password: string
}

export interface userInputType {
    email : string,
    nickname : string,
    password : string
}

export interface SignupType {
    email : string,
    emailValid : boolean | null
    password: string,
    passwordValid: boolean | null
    confirm_password : string,
    nickname: string
    nicknameValid : boolean | null
}

export interface SigninType {
    email : string,
    emailValid : boolean | null,
    password : string,
    passwordValid : boolean | null
}

export interface SigninDetailType {
    email : string,
    password : string,
}

export interface userDataType{
    id : string,
    email : string,
    nickname: string
}

export interface MovieSearchResponse {
    page: number;
    results: MovieDetailsType[];
    total_pages: number;
    total_results: number;
}

export interface WatchHistory {
    id: string,
    userId: string,
    movieId: number,
    watchedAt: number
}