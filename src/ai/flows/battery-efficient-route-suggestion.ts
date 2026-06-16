'use server';
/**
 * @fileOverview A flow for suggesting the most battery-efficient route for a scooter ride.
 *
 * - suggestBatteryEfficientRoute - A function that suggests a battery-efficient route.
 * - BatteryEfficientRouteSuggestionInput - The input type for the suggestBatteryEfficientRoute function.
 * - BatteryEfficientRouteSuggestionOutput - The return type for the suggestBatteryEfficientRoute function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const LocationSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});

const BatteryEfficientRouteSuggestionInputSchema = z.object({
  startLocation: LocationSchema.describe('The starting location for the ride.'),
  endLocation: LocationSchema.describe('The ending location for the ride.'),
});
export type BatteryEfficientRouteSuggestionInput = z.infer<typeof BatteryEfficientRouteSuggestionInputSchema>;

// Output Schema
const BatteryEfficientRouteSuggestionOutputSchema = z.object({
  suggestedRoutePolyline: z.string().describe('The polyline string representing the suggested battery-efficient route.'),
  reasoning: z.string().describe('An explanation of why this route is considered battery-efficient, considering terrain and traffic.'),
  estimatedDistanceKm: z.number().describe('The estimated distance of the suggested route in kilometers.'),
  estimatedBatterySavingsPercent: z.number().describe('Estimated battery savings percentage compared to a direct or typical route.'),
});
export type BatteryEfficientRouteSuggestionOutput = z.infer<typeof BatteryEfficientRouteSuggestionOutputSchema>;

export async function suggestBatteryEfficientRoute(input: BatteryEfficientRouteSuggestionInput): Promise<BatteryEfficientRouteSuggestionOutput> {
  return batteryEfficientRouteSuggestionFlow(input);
}

// Mock function to simulate fetching route options with terrain and traffic data
async function getMockRouteOptions(start: z.infer<typeof LocationSchema>, end: z.infer<typeof LocationSchema>) {
  // In a real application, this would call a mapping/routing API (e.g., Google Maps Directions API, OpenStreetMap, etc.)
  // and integrate real-time traffic and topographical data.
  // For this example, we'll create some plausible mock data.

  const distance = calculateDistance(start, end);

  const routeOptions = [
    {
      id: 'route_1',
      description: 'Direct route with some inclines and moderate traffic.',
      polyline: 'some_encoded_polyline_1', // Placeholder
      distanceKm: distance,
      elevationProfile: 'Starts flat, then a moderate climb, followed by a slight descent towards the destination.',
      trafficImpact: 'Moderate traffic, average speed expected.',
    },
    {
      id: 'route_2',
      description: 'Slightly longer route, but mostly flat with light traffic.',
      polyline: 'some_encoded_polyline_2', // Placeholder
      distanceKm: distance * 1.1, // 10% longer
      elevationProfile: 'Predominantly flat terrain throughout, minimal elevation changes.',
      trafficImpact: 'Light traffic, good for consistent speed.',
    },
    {
      id: 'route_3',
      description: 'Shortest route, but steep uphill section and potentially heavy traffic.',
      polyline: 'some_encoded_polyline_3', // Placeholder
      distanceKm: distance * 0.9, // 10% shorter
      elevationProfile: 'Significant uphill climb in the middle section, then flat.',
      trafficImpact: 'Potentially heavy traffic during peak hours due to a bottleneck.',
    },
  ];
  return routeOptions;
}

// Simple haversine distance for mock data. Not critical for the AI logic itself.
function calculateDistance(loc1: z.infer<typeof LocationSchema>, loc2: z.infer<typeof LocationSchema>) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (loc2.latitude - loc1.latitude) * Math.PI / 180;
  const dLon = (loc2.longitude - loc1.longitude) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.latitude * Math.PI / 180) * Math.cos(loc2.latitude * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

const prompt = ai.definePrompt({
  name: 'batteryEfficientRoutePrompt',
  input: { schema: BatteryEfficientRouteSuggestionInputSchema.extend({
    routeOptions: z.array(z.object({
      id: z.string(),
      description: z.string(),
      polyline: z.string(),
      distanceKm: z.number(),
      elevationProfile: z.string(),
      trafficImpact: z.string(),
    })).describe('Available route options including their characteristics.'),
  })},
  output: { schema: BatteryEfficientRouteSuggestionOutputSchema },
  prompt: `You are an AI assistant specialized in planning scooter routes for optimal battery efficiency.\nGiven a starting point, an ending point, and several route options with their terrain and traffic characteristics,\nyour task is to select the most battery-efficient route.\n\nConsider the following factors for battery efficiency:\n- **Terrain**: Flat routes or routes with more downhill sections are generally more efficient than uphill climbs.\n- **Distance**: Shorter routes consume less battery, but may not always be the most efficient if they involve steep climbs.\n- **Traffic**: Light traffic allows for consistent speed, reducing stop-and-go battery drain. Heavy traffic can significantly decrease efficiency.\n\nAnalyze the provided route options and recommend the one that best balances these factors to maximize battery range.\nProvide a clear explanation for your choice, including estimated distance and battery savings.\n\nStarting Location: Lat {{{startLocation.latitude}}}, Lon {{{startLocation.longitude}}}\nEnding Location: Lat {{{endLocation.latitude}}}, Lon {{{endLocation.longitude}}}\n\nAvailable Route Options:\n{{#each routeOptions}}\n--- Route ID: {{{id}}} ---\nDescription: {{{description}}}\nDistance: {{{distanceKm}}} km\nElevation Profile: {{{elevationProfile}}}\nTraffic Impact: {{{trafficImpact}}}\n---\n{{/each}}\n\nBased on the above, select the most battery-efficient route and explain your choice.`,
});

const batteryEfficientRouteSuggestionFlow = ai.defineFlow(
  {
    name: 'batteryEfficientRouteSuggestionFlow',
    inputSchema: BatteryEfficientRouteSuggestionInputSchema,
    outputSchema: BatteryEfficientRouteSuggestionOutputSchema,
  },
  async (input) => {
    // Step 1: Get potential route options with simulated terrain and traffic data
    const routeOptions = await getMockRouteOptions(input.startLocation, input.endLocation);

    // Step 2: Pass the route options to the prompt for AI analysis
    const { output } = await prompt({
      startLocation: input.startLocation,
      endLocation: input.endLocation,
      routeOptions: routeOptions,
    });

    if (!output) {
      throw new Error('Failed to get route suggestion from AI.');
    }

    return output;
  }
);
