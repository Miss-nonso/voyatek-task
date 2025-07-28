"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Plane,
  Filter,
  SortAsc,
  Clock,
  ArrowRight,
  AlertCircle,
  Wifi,
  Coffee,
  Luggage,
  X,
  CheckCircle,
  Star,
  TrendingUp,
  Shield
} from "lucide-react";

// --- Fully Defined Interfaces ---

interface Price {
  currencyCode: string;
  units: number;
  nanos: number;
}

interface AirlineCarrierInfo {
  operatingCarrier: string;
  marketingCarrier: string;
  operatingCarrierDisclosureText: string;
}

interface FlightInfo {
  facilities: Facility[]; // Defined below
  flightNumber: number;
  planeType: string;
  carrierInfo: AirlineCarrierInfo;
}

interface AirlineData {
  name: string;
  code: string;
  logo: string;
  iataCode?: string;
  count?: number;
  minPrice?: Price;
}

interface AirportInfo {
  type: string;
  code: string;
  name: string;
  city: string;
  cityName: string;
  country: string;
  countryName: string;
  province: string;
}

interface FlightStop {
  airportCode: string;
  arrivalTime: string;
  departureTime: string;
  duration: number;
}

interface Facility {
  name: string;
  code: string;
}

interface Amenity {
  name: string;
  code: string;
}

interface LuggageAllowance {
  luggageType: "CHECKED_IN" | "HAND";
  ruleType: "PIECE_BASED" | "WEIGHT_BASED";
  maxPiece?: number;
  maxWeightPerPiece?: number;
  massUnit?: string; // e.g., "KG"
  sizeRestrictions?: {
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    sizeUnit: string; // e.g., "CM"
  };
  personalItem?: boolean;
}

interface TravellerLuggage {
  travellerReference: string;
  luggageAllowance: LuggageAllowance;
}

interface Leg {
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  departureAirport: AirportInfo;
  arrivalAirport: AirportInfo;
  cabinClass: string;
  flightInfo: FlightInfo;
  carriers: string[]; // Array of IATA codes
  carriersData: AirlineData[]; // Detailed airline info for carriers
  totalTime: number; // in seconds
  flightStops: FlightStop[];
  amenities: Amenity[];
}

interface Segment {
  departureAirport: AirportInfo;
  arrivalAirport: AirportInfo;
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  legs: Leg[];
  totalTime: number; // in seconds
  travellerCheckedLuggage: TravellerLuggage[];
  travellerCabinLuggage: TravellerLuggage[];
  isAtolProtected: boolean;
  showWarningDestinationAirport: boolean;
  showWarningOriginAirport: boolean;
}

interface TravellerPriceBreakdown {
  total: Price;
  baseFare: Price;
  fee: Price;
  tax: Price;
  totalRounded: Price;
  discount: Price;
  totalWithoutDiscount: Price;
  totalWithoutDiscountRounded: Price;
  showPriceStrikethrough: boolean;
}

interface TravellerPrice {
  travellerPriceBreakdown: TravellerPriceBreakdown;
  travellerReference: string;
  travellerType: "ADULT" | "KID" | "INFANT";
}

interface PosMismatch {
  detectedPointOfSale: string;
  isPOSMismatch: boolean;
  offerSalesCountry: string;
}

interface Product {
  luggageType?: "PERSONAL_ITEM" | "HAND" | "CHECKED_IN";
  maxPiece?: number;
  piecePerPax?: number;
  maxWeightPerPiece?: number;
  massUnit?: string;
  sizeRestrictions?: {
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    sizeUnit: string;
  };
  ruleType?: "PIECE_BASED";
}

interface TravellerProduct {
  travellerReference: string;
  travellerProducts: {
    type: string; // e.g., 'checkedInBaggage', 'cabinBaggage', 'personalItem'
    product: Product;
  }[];
}

interface IncludedProductsBySegmentItem {
  // This is a complex nested array from your JSON: [[{travellerReference: "1", travellerProducts: [...]}, {...}]]
  // Representing one segment's included products for all travellers
  [travellerIndex: number]: TravellerProduct[]; // Array of TravellerProduct arrays
}

interface IncludedProducts {
  areAllSegmentsIdentical: boolean;
  segments: Product[][]; // Array of segments, each containing an array of products
}

interface ExtraProductPriceBreakdown {
  total: Price;
  baseFare: Price;
  fee: Price;
  tax: Price;
  discount: Price;
  totalWithoutDiscount: Price;
}

interface ExtraProduct {
  type: string; // e.g., 'flexibleTicket'
  priceBreakdown: ExtraProductPriceBreakdown;
}

interface Recommendation {
  recommended: boolean;
  confidence: string; // 'UNKNOWN_LEVEL'
}

interface SupplierInfo {
  name: string;
  termsUrl: string;
  privacyPolicyUrl: string;
}

interface FlexibleTicketOfferExtra {
  airProductReference: string;
  travellers: string[]; // Traveller references
  recommendation: Recommendation;
  priceBreakdown: TravellerPriceBreakdown;
  supplierInfo: SupplierInfo;
}

interface OfferExtras {
  flexibleTicket?: FlexibleTicketOfferExtra;
  // Add other specific offer extras if they appear in the API response
}

interface AncillaryFlexibleTicket {
  airProductReference: string;
  travellers: string[];
  priceBreakdown: TravellerPriceBreakdown;
  preSelected: boolean;
  recommendation: Recommendation;
  supplierInfo: SupplierInfo;
}

interface Ancillaries {
  flexibleTicket?: AncillaryFlexibleTicket;
  // Add other specific ancillaries if they appear in the API response
}

interface PriceItem {
  id: string;
  title: string;
  price: Price;
  items: PriceItem[];
  scope?: string;
}

interface UnifiedPriceBreakdown {
  id: string;
  price: Price;
  items: PriceItem[];
  addedItems: string[];
}

interface FlightOfferApi {
  token: string;
  segments: Segment[];
  priceBreakdown: {
    total: Price;
    baseFare: Price;
    fee: Price;
    tax: Price;
    totalRounded: Price;
    discount: Price;
    totalWithoutDiscount: Price;
    totalWithoutDiscountRounded: Price;
    carrierTaxBreakdown: {
      carrier: { name: string; code: string; logo: string };
      avgPerAdult: Price;
      avgPerChild: Price;
    }[];
    showPriceStrikethrough: boolean;
  };
  travellerPrices: TravellerPrice[];
  priceDisplayRequirements: string[];
  pointOfSale: string;
  tripType: string;
  posMismatch: PosMismatch;
  includedProductsBySegment: IncludedProductsBySegmentItem[][];
  includedProducts: IncludedProducts;
  extraProducts: ExtraProduct[];
  offerExtras: OfferExtras;
  ancillaries: Ancillaries;
  appliedDiscounts: string[];
  offerKeyToHighlight: string;
  extraProductDisplayRequirements: string[];
  unifiedPriceBreakdown: UnifiedPriceBreakdown;
  perTravellerPriceDifferences: string[];
  durationInMinutes?: number;
  cabinClass?: string;
  baggage?: string[];
  amenities?: Amenity[];
}

interface StopAggregation {
  numberOfStops: number;
  count: number;
  minPrice: Price;
  minPriceRound: Price;
}

interface TimeInterval {
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  count?: number;
}

interface FlightTimesAggregation {
  arrival: TimeInterval[];
  departure: TimeInterval[];
}

interface ShortLayoverConnection {
  count: number;
}

interface BudgetAggregation {
  paramName: string;
  min: Price;
  max: Price;
}

interface BudgetPerAdultAggregation {
  paramName: string;
  min: Price;
  max: Price;
}

interface DurationAggregationItem {
  min: number;
  max: number;
  durationType: "JOURNEY" | "LAYOVER";
  enabled: boolean;
  paramName: string;
}

interface BaggageAggregationItem {
  paramName: string;
  count: number;
  enabled: boolean;
  baggageType: "CABIN" | "CHECKIN";
}

interface Aggregation {
  totalCount: number;
  filteredTotalCount: number;
  stops: StopAggregation[];
  airlines: AirlineData[];
  departureIntervals: TimeInterval[];
  flightTimes: FlightTimesAggregation;
  shortLayoverConnection: ShortLayoverConnection;
  durationMin: number;
  durationMax: number;
  minPrice: Price;
  minRoundPrice: Price;
  minPriceFiltered: Price;
  baggage: BaggageAggregationItem[];
  budget: BudgetAggregation;
  budgetPerAdult: BudgetPerAdultAggregation;
  duration: DurationAggregationItem[];
  filtersOrder: string[];
}

interface ApiResponseData {
  aggregation: Aggregation;
  flightOffers: FlightOfferApi[];
}

interface ApiResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: ApiResponseData;
}

interface TransformedFlight {
  id: string;
  token: string;
  airline: {
    name: string;
    code: string;
    logoUrl?: string;
  };
  flightNumber: string;
  departure: {
    airport: string;
    airportName: string;
    city: string;
    time: string; // "HH:MM" format
    date: string; // "YYYY-MM-DD" format
  };
  arrival: {
    airport: string;
    airportName: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  durationMinutes: number;
  price: Price;
  priceValue: number;
  stops: number;
  aircraft: string;
  cabinClass: string;
  baggage: string[];
}

interface SearchParams {
  from: string;
  fromId: string;
  to: string;
  toId: string;
  departure: string;
  return: string;
  passengers: number;
  tripType: string;
}

interface Filters {
  stops: string;
  airlines: string[];
  priceRange: [number, number];
  departureTime: string;
  duration: [number, number]; // Duration in hours
}

interface AirportOption {
  id: string;
  label: string;
}

export default function FlightSearchPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [flights, setFlights] = useState<TransformedFlight[] | any[]>([]);
  const [aggregation, setAggregation] = useState<Aggregation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "Mumbai (BOM)",
    fromId: "BOM.AIRPORT",
    to: "Delhi (DEL)",
    toId: "DEL.AIRPORT",
    departure: "2025-08-01",
    return: "",
    passengers: 1,
    tripType: "one-way"
  });
  const [sortBy, setSortBy] = useState<string>("price");
  const [filters, setFilters] = useState<Filters>({
    stops: "all",
    airlines: [],
    priceRange: [0, 10000],
    departureTime: "all",
    duration: [0, 30] // Duration in hours
  });
  const [itinerary, setItinerary] = useState<TransformedFlight[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Price formatting helper
  const formatPrice = (price: Price): string => {
    if (!price) return "N/A";
    const total = price.units + price.nanos / 1_000_000_000;
    return `${price.currencyCode} ${total.toFixed(2)}`;
  };

  // Duration formatting helper
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Transform API response to the flight format
  const transformFlightData = (apiData: ApiResponseData) => {
    if (!apiData?.flightOffers) return [];

    return apiData.flightOffers.map((flight, index) => {
      const segment = flight.segments?.[0];
      const firstLeg = segment?.legs?.[0];
      const lastSegment = flight.segments?.[flight.segments.length - 1];
      const lastLeg = lastSegment?.legs?.[0];

      return {
        id: flight.token || `flight-${index}`,
        token: flight.token,
        airline: {
          name: firstLeg?.carriersData?.[0]?.name || "Unknown Airline",
          code: firstLeg?.carriersData?.[0]?.code || "XX",
          logoUrl: firstLeg?.carriersData?.[0]?.logo || undefined
        },
        flightNumber: `${
          firstLeg?.flightInfo?.carrierInfo?.marketingCarrier || "XX"
        } ${firstLeg?.flightInfo?.flightNumber || "0000"}`,
        departure: {
          airport: segment?.departureAirport?.code || "N/A",
          airportName: segment?.departureAirport?.name || "Unknown Airport",
          city: segment?.departureAirport?.cityName || "Unknown City",
          time: segment?.departureTime
            ? new Date(segment.departureTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })
            : "N/A",
          date: segment?.departureTime
            ? new Date(segment.departureTime).toISOString().split("T")[0]
            : searchParams.departure
        },
        arrival: {
          airport: lastLeg?.arrivalAirport?.code || "N/A",
          airportName: lastLeg?.arrivalAirport?.name || "Unknown Airport",
          city: lastLeg?.arrivalAirport?.cityName || "Unknown City",
          time: lastLeg?.arrivalTime
            ? new Date(lastLeg.arrivalTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })
            : "N/A",
          date: lastLeg?.arrivalTime
            ? new Date(lastLeg.arrivalTime).toISOString().split("T")[0]
            : searchParams.departure
        },
        duration: flight.durationInMinutes
          ? formatDuration(flight.durationInMinutes)
          : "N/A",
        durationMinutes: flight.durationInMinutes || 0,
        price: flight.priceBreakdown?.total || {
          currencyCode: "AED",
          units: 0,
          nanos: 0
        },
        priceValue: flight.priceBreakdown?.total
          ? flight.priceBreakdown.total.units +
            flight.priceBreakdown.total.nanos / 1_000_000_000
          : 0,
        stops: flight.segments ? flight.segments.length - 1 : 0,
        aircraft: firstLeg?.flightInfo?.planeType || "N/A",
        cabinClass: flight.cabinClass || "Economy",
        baggage: flight.baggage || {},
        amenities: flight.amenities || []
      };
    });
  };

  // API call to RapidAPI
  const searchFlights = async () => {
    setLoading(true);
    setError(null);

    const fromId = searchParams.fromId;
    const toId = searchParams.toId;

    const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromId}&toId=${toId}&departDate=${searchParams.departure}&stops=none&pageNo=1&adults=${searchParams.passengers}&children=0%2C17&sort=BEST&cabinClass=ECONOMY&currency_code=AED`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f1ff9c3f3amshce5b4e8bf88f2f9p1f383djsn2c81cc896165",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
      }
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.status && result.data) {
        const transformedFlights = transformFlightData(result.data);
        setFlights(transformedFlights);
        setAggregation(result.data.aggregation);

        // Update price range based on API data
        if (result.data.aggregation?.budget) {
          const minPrice =
            result.data.aggregation.budget.min.units +
            result.data.aggregation.budget.min.nanos / 1_000_000_000;
          const maxPrice =
            result.data.aggregation.budget.max.units +
            result.data.aggregation.budget.max.nanos / 1_000_000_000;
          setFilters((prev) => ({
            ...prev,
            priceRange: [minPrice, maxPrice]
          }));
        }
      } else {
        setFlights([]);
        setError(result.message || "No flights found for your search criteria");
      }
    } catch (error: unknown) {
      // Use 'unknown' for better type safety
      console.error("API Error:", error);
      if (error instanceof Error) {
        setError(`Failed to fetch flights: ${error.message}`);
      } else {
        setError("Failed to fetch flights: An unknown error occurred.");
      }
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToItinerary = (flight: TransformedFlight) => {
    setItinerary((prev) => {
      if (prev.find((f) => f.id === flight.id)) {
        return prev.filter((f) => f.id !== flight.id);
      }
      return [...prev, flight];
    });
  };

  const isInItinerary = (flightId: string): boolean => {
    return itinerary.some((f) => f.id === flightId);
  };

  // Apply filters and sorting
  const getFilteredAndSortedFlights = (): TransformedFlight[] => {
    let filtered = [...flights];

    // Filter by stops
    if (filters.stops !== "all") {
      const stopCount = parseInt(filters.stops, 10);
      filtered = filtered.filter((flight) => flight.stops === stopCount);
    }

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter((flight) =>
        filters.airlines.includes(flight.airline.code)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (flight) =>
        flight.priceValue >= filters.priceRange[0] &&
        flight.priceValue <= filters.priceRange[1]
    );

    // Filter by duration (assuming filters.duration is in hours, convert to minutes)
    filtered = filtered.filter(
      (flight) =>
        flight.durationMinutes >= filters.duration[0] * 60 &&
        flight.durationMinutes <= filters.duration[1] * 60
    );

    // Sort flights
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.priceValue - b.priceValue;
        case "duration":
          return a.durationMinutes - b.durationMinutes;
        case "departure":
          return a.departure.time.localeCompare(b.departure.time);
        case "arrival":
          return a.arrival.time.localeCompare(b.arrival.time);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredFlights = getFilteredAndSortedFlights();

  // Airport/City options
  const airportOptions: AirportOption[] = [
    { id: "BOM.AIRPORT", label: "Mumbai (BOM)" },
    { id: "DEL.AIRPORT", label: "Delhi (DEL)" },
    { id: "BLR.AIRPORT", label: "Bangalore (BLR)" },
    { id: "MAA.AIRPORT", label: "Chennai (MAA)" },
    { id: "CCU.AIRPORT", label: "Kolkata (CCU)" },
    { id: "HYD.AIRPORT", label: "Hyderabad (HYD)" },
    { id: "PNQ.AIRPORT", label: "Pune (PNQ)" },
    { id: "AMD.AIRPORT", label: "Ahmedabad (AMD)" },
    { id: "GOI.AIRPORT", label: "Goa (GOI)" },
    { id: "COK.AIRPORT", label: "Kochi (COK)" }
  ];

  const FilterPanel = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stops Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Stops</h4>
        <div className="space-y-2">
          {["all", "0", "1", "2+"].map((stop) => (
            <label key={stop} className="flex items-center">
              <input
                type="radio"
                name="stops"
                value={stop}
                checked={filters.stops === stop}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilters((prev) => ({ ...prev, stops: e.target.value }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {stop === "all"
                  ? "All flights"
                  : stop === "0"
                  ? "Direct"
                  : stop === "2+"
                  ? "2+ stops"
                  : `${stop} stop`}
              </span>
              {aggregation?.stops && (
                <span className="ml-auto text-xs text-gray-500">
                  (
                  {aggregation.stops.find(
                    (s) => s.numberOfStops.toString() === stop
                  )?.count || 0}
                  )
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Airlines Filter */}
      {aggregation?.airlines && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Airlines</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {aggregation.airlines.map((airline) => (
              <label key={airline.iataCode} className="flex items-center">
                <input
                  type="checkbox"
                  value={airline.iataCode}
                  checked={filters.airlines.includes(airline.iataCode || "")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const code = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      airlines: e.target.checked
                        ? [...prev.airlines, code]
                        : prev.airlines.filter((a) => a !== code)
                    }));
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-2 flex items-center flex-1">
                  {airline.logo && (
                    <Image
                      width={300}
                      height={300}
                      src={airline.logo}
                      alt={airline.name}
                      className="w-4 h-4 mr-2"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <span className="text-sm text-gray-700 flex-1">
                    {airline.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({airline.count})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      {aggregation?.budget && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Price Range
          </h4>
          <div className="px-3">
            <input
              type="range"
              min={
                aggregation.budget.min.units +
                aggregation.budget.min.nanos / 1_000_000_000
              }
              max={
                aggregation.budget.max.units +
                aggregation.budget.max.nanos / 1_000_000_000
              }
              value={filters.priceRange[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseFloat(e.target.value)]
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>AED {formatPrice(aggregation.budget.min)}</span>
              <span>AED {filters.priceRange[1].toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Flight Search
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{itinerary.length} flights selected</span>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  value={searchParams.fromId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selected = airportOptions.find(
                      (opt) => opt.id === e.target.value
                    );
                    setSearchParams((prev) => ({
                      ...prev,
                      from: selected?.label || "",
                      fromId: e.target.value
                    }));
                  }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {airportOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  value={searchParams.toId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selected = airportOptions.find(
                      (opt) => opt.id === e.target.value
                    );
                    setSearchParams((prev) => ({
                      ...prev,
                      to: selected?.label || "",
                      toId: e.target.value
                    }));
                  }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {airportOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departure
              </label>
              <input
                type="date"
                value={searchParams.departure}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    departure: e.target.value
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passengers
              </label>
              <input
                type="number"
                min="1"
                max="9"
                value={searchParams.passengers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    passengers: parseInt(e.target.value, 10)
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={searchFlights}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? "Searching..." : "Search"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:w-80 flex-shrink-0`}
          >
            <FilterPanel />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSortBy(e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="price">Best Price</option>
                    <option value="duration">Shortest Duration</option>
                    <option value="departure">Earliest Departure</option>
                    <option value="arrival">Earliest Arrival</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span>
                  {filteredFlights.length} of {flights.length} flights
                </span>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
                  <div className="text-center">
                    <p className="text-gray-600 font-medium">
                      Searching for the best flights...
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      This may take a few seconds
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFlights.map((flight, index) => (
                  <div
                    key={flight.id}
                    className={`bg-white border rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-200 ${
                      isInItinerary(flight.id)
                        ? "border-green-300 bg-green-50 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {flight.airline.logoUrl && (
                              <Image
                                width={300}
                                height={300}
                                src={flight.airline.logoUrl}
                                alt={flight.airline.name}
                                className="w-6 h-6"
                                onError={(
                                  e: React.SyntheticEvent<
                                    HTMLImageElement,
                                    Event
                                  >
                                ) => (e.currentTarget.style.display = "none")}
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">
                                {flight.airline.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {flight.flightNumber}
                              </p>
                            </div>
                          </div>
                          {index === 0 && (
                            <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              <Star className="w-3 h-3" />
                              <span>Best Value</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Departure */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {flight.departure.time}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                              {flight.departure.airport}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.departure.city}
                            </div>
                          </div>

                          {/* Flight Path */}
                          <div className="flex-1 mx-8">
                            <div className="flex items-center justify-center mb-2">
                              <div className="flex-1 h-0.5 bg-gray-300 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></div>
                              </div>
                              <div className="mx-4 flex items-center space-x-2 text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                                <Clock className="w-3 h-3" />
                                <span>{flight.duration}</span>
                              </div>
                              <div className="flex-1 h-0.5 bg-gray-300 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-600">
                                {flight.stops === 0
                                  ? "Direct flight"
                                  : `${flight.stops} stop${
                                      flight.stops > 1 ? "s" : ""
                                    }`}
                              </div>
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {flight.arrival.time}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                              {flight.arrival.airport}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.arrival.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="lg:ml-8 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center space-x-4 lg:space-x-0 lg:space-y-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(flight.price)}
                          </div>
                          <div className="text-sm text-gray-500">
                            per person
                          </div>
                          {flight.cabinClass && (
                            <div className="text-xs text-gray-500 mt-1">
                              {flight.cabinClass}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToItinerary(flight)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isInItinerary(flight.id)
                              ? "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300 shadow-sm"
                              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                          }`}
                        >
                          {isInItinerary(flight.id) ? (
                            <span className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Added</span>
                            </span>
                          ) : (
                            "Add to Trip"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredFlights.length === 0 && !loading && (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No flights match your criteria
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your filters or search for different dates
                    </p>
                    <button
                      onClick={() =>
                        setFilters({
                          stops: "all",
                          airlines: [],
                          priceRange: [0, 10000],
                          departureTime: "all",
                          duration: [0, 30]
                        })
                      }
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
