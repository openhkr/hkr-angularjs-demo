
export declare class Amap {
  initMap(): void;
  vehicleMarker(location: any): void;
  clearMarker(n: number): void;
  setMapZoom(): void;
  setFlag(flag: boolean): void;
  checkLocation(locationCopy: any, location: any): boolean;
  checkPersonLocation(locationCopy: any, location: any): boolean;
  clearPosition(): void;
  getGeolocation(lng: number , lat: number): void;
  destroy(): void;
  stopMove(): void;
  check():void;
  getCurrentLocation():any;
  Scale():any;
  ToolBar():any;
}
