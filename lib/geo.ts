// Precise client-side reverse geocoding (OpenStreetMap Nominatim, no API key).
// zoom=18 returns building-level detail — house number, street, sector — so the
// user sees their exact address, not just the city.

export interface PreciseAddress {
  /** full human label, e.g. "House 12, Street 45, G-10/4, Islamabad" */
  label: string;
  /** short area, e.g. "G-10/4" */
  area: string;
  /** city name as reported by OSM */
  city: string;
  /** district / county, e.g. "Haripur District" */
  district: string;
  /** province / territory, e.g. "Islamabad Capital Territory", "Khyber Pakhtunkhwa" */
  state: string;
}

/**
 * True live-location fix. A single getCurrentPosition call returns the browser's
 * FIRST fix, which is often a coarse Wi-Fi/IP guess. This instead watches the
 * position as the device's GPS warms up and keeps the most accurate fix,
 * resolving early once accuracy is within `targetAccuracy` metres.
 */
export function getPrecisePosition(targetAccuracy = 50, maxWaitMs = 15000): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("geolocation unsupported"));
      return;
    }
    let best: GeolocationPosition | null = null;
    let settled = false;

    const finish = (ok: boolean, err?: GeolocationPositionError | Error) => {
      if (settled) return;
      settled = true;
      navigator.geolocation.clearWatch(watchId);
      clearTimeout(timer);
      if (ok && best) resolve(best);
      else if (best) resolve(best); // even on error, a fix in hand beats none
      else reject(err || new Error("no fix"));
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!best || pos.coords.accuracy < best.coords.accuracy) best = pos;
        if (pos.coords.accuracy <= targetAccuracy) finish(true);
      },
      (err) => finish(false, err),
      { enableHighAccuracy: true, timeout: maxWaitMs, maximumAge: 0 }
    );
    const timer = setTimeout(() => finish(true), maxWaitMs);
  });
}

export async function reverseGeocode(lat: number, lng: number): Promise<PreciseAddress> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
    { headers: { "Accept-Language": "en" } }
  );
  if (!res.ok) throw new Error("reverse geocoding failed");
  const data = await res.json();
  const a = data.address || {};

  const house = a.house_number ? `House ${a.house_number}` : "";
  const street = a.road || a.pedestrian || a.residential || "";
  const area = a.suburb || a.neighbourhood || a.quarter || a.city_district || a.village || a.town || "";
  const city = a.city || a.town || a.municipality || a.county || a.state || "";

  const label = [house, street, area, city].filter(Boolean).join(", ")
    || data.display_name
    || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

  return {
    label,
    area,
    city,
    district: a.county || a.state_district || a.district || "",
    state: a.state || a.region || "",
  };
}
