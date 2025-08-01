export type StarRatingProps = {
    reviews: Review[]; 
    size?: number; 
};

export type Review = {
    rating: number;
};