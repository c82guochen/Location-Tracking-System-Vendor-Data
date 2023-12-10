export interface Geotag {
    id: string;
    name: string;
    place_type: string; // 这种带下划线的命名方法叫蛇形命名法（Snake Case）
    full_name: string;
    country: string;
    country_code: string;
    coordinates: {
      lat: number;
      long: number;
    };
}
  
export interface Tweet {
    id: string;
    userId: string; // associate with twitter id in Vendor
    userName: string;
    text: string;
    date: string;
    geo: Geotag; // PS: GeoHash：1-64个格，每一格可以再细分
};

export interface Vendor{
    name: string;
    image: string;
    description: string;
    twitterId: string; //就是Tweet的userId
    tweets: Tweet[];
    created: number;
    updated: number;
};