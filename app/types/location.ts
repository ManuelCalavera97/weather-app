export type geoPos = {
  lat: number;
  lng: number;
};

export type location = {
  isLoading?: boolean;
  pos?: geoPos;
  error?: string;
};
