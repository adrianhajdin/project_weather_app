export default async () => {
  await navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude} }) => this.setState({ geolocation: { latitude, longitude} }));
}