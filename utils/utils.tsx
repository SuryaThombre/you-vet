

export default async function getNearestCity(latitude:any, longitude:any) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.address && data.address.city) {
          return data.address.city;
      } else if (data.address && data.address.town) {
          return data.address.town;
      } else if (data.address && data.address.village) {
          return data.address.village;
      } else if (data.address && data.address.hamlet) {
          return data.address.hamlet;
      } else {
          return "City not found";
      }
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}