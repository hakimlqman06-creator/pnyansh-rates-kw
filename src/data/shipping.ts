export type ShippingRate = {
  state: string;
  city: string;
  branch: string;
  total: number;
};

// Sample data — replace with the full dataset from the source document.
export const shippingRates: ShippingRate[] = [
  { state: "Texas", city: "Houston", branch: "Copart", total: 1450 },
  { state: "Texas", city: "Dallas", branch: "IAA", total: 1500 },
  { state: "Texas", city: "Austin", branch: "Copart", total: 1550 },
  { state: "California", city: "Los Angeles", branch: "Copart", total: 1600 },
  { state: "California", city: "San Diego", branch: "IAA", total: 1650 },
  { state: "California", city: "Sacramento", branch: "Copart", total: 1700 },
  { state: "Washington", city: "Seattle", branch: "Copart", total: 1750 },
  { state: "Washington", city: "Spokane", branch: "IAA", total: 1800 },
  { state: "New York", city: "New York", branch: "IAA", total: 1350 },
  { state: "New York", city: "Albany", branch: "Copart", total: 1400 },
  { state: "Florida", city: "Miami", branch: "Copart", total: 1250 },
  { state: "Florida", city: "Orlando", branch: "IAA", total: 1300 },
  { state: "Florida", city: "Tampa", branch: "Copart", total: 1280 },
  { state: "Georgia", city: "Atlanta", branch: "Manheim", total: 1200 },
  { state: "Georgia", city: "Savannah", branch: "Copart", total: 1220 },
  { state: "Illinois", city: "Chicago", branch: "IAA", total: 1380 },
  { state: "Ohio", city: "Columbus", branch: "Manheim", total: 1320 },
  { state: "Ohio", city: "Cleveland", branch: "Copart", total: 1340 },
  { state: "Michigan", city: "Detroit", branch: "Manheim", total: 1360 },
  { state: "Arizona", city: "Phoenix", branch: "Copart", total: 1580 },
  { state: "Nevada", city: "Las Vegas", branch: "IAA", total: 1620 },
  { state: "New Jersey", city: "Newark", branch: "Copart", total: 1380 },
  { state: "Pennsylvania", city: "Philadelphia", branch: "IAA", total: 1360 },
  { state: "North Carolina", city: "Charlotte", branch: "Copart", total: 1280 },
  { state: "Virginia", city: "Richmond", branch: "IAA", total: 1300 },
];
