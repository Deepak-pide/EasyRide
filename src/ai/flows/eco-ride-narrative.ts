'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a personalized, creative summary
 * of a user's scooter ride's positive environmental impact.
 *
 * - ecoRideNarrative - A function that handles the eco-narrative generation process.
 * - EcoRideNarrativeInput - The input type for the ecoRideNarrative function.
 * - EcoRideNarrativeOutput - The return type for the ecoRideNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EcoRideNarrativeInputSchema = z.object({
  userDisplayName: z
    .string()
    .describe('The display name of the user for personalization.'),
  distanceKm: z.number().describe('The distance traveled in kilometers.'),
  durationMinutes: z.number().describe('The duration of the ride in minutes.'),
  carbonSavedKg: z
    .number()
    .describe('The estimated carbon emissions saved in kilograms.'),
  caloriesBurned: z.number().describe('The estimated calories burned by the user.'),
  numRides: z.number().describe('The total number of rides the user has taken.'),
});
export type EcoRideNarrativeInput = z.infer<typeof EcoRideNarrativeInputSchema>;

const EcoRideNarrativeOutputSchema = z.object({
  narrative: z.string().describe(
    "A creative and personalized summary of the user's ride's positive environmental impact."
  ),
  ecoScore: z.number().describe('A numerical score representing the environmental impact.'),
});
export type EcoRideNarrativeOutput = z.infer<typeof EcoRideNarrativeOutputSchema>;

export async function ecoRideNarrative(
  input: EcoRideNarrativeInput
): Promise<EcoRideNarrativeOutput> {
  return ecoRideNarrativeFlow(input);
}

const ecoRideNarrativePrompt = ai.definePrompt({
  name: 'ecoRideNarrativePrompt',
  input: {schema: EcoRideNarrativeInputSchema},
  output: {schema: EcoRideNarrativeOutputSchema},
  prompt: `You are an AI assistant specialized in generating inspiring and personalized eco-narratives for EasyRide scooter users. Your goal is to highlight the positive environmental impact of their ride.

Use an encouraging, slightly futuristic, and modern tone. Incorporate the EasyRide brand's visual identity: think Electric Azure, Pale Slate Blue, and High-Contrast Safety Yellow, with 'Space Grotesk' for impactful statements and 'Inter' for readability.

Generate a creative summary for {{{userDisplayName}}}'s recent ride, focusing on their contribution to a greener city. Also, assign a numerical eco-score between 1 and 100 based on their environmental performance.

Here are the details of the ride:
- Distance Traveled: {{{distanceKm}}} km
- Duration: {{{durationMinutes}}} minutes
- Carbon Emissions Saved: {{{carbonSavedKg}}} kg (compared to a typical car journey)
- Calories Burned: {{{caloriesBurned}}} kcal
- Total Rides by User: {{{numRides}}} (including this one)

Craft a narrative that makes them feel good about their sustainable choice and encourages future eco-friendly travel. Be concise, impactful, and reflect the positive, clean energy vibe of EasyRide.

Example Narrative Tone:
"Awesome journey, {{{userDisplayName}}}! Your latest ride wasn't just a trip; it was a stride towards a cleaner planet. By choosing EasyRide, you zapped away {{{carbonSavedKg}}}kg of carbon, making our city's air a little fresher and brighter."
`,
});

const ecoRideNarrativeFlow = ai.defineFlow(
  {
    name: 'ecoRideNarrativeFlow',
    inputSchema: EcoRideNarrativeInputSchema,
    outputSchema: EcoRideNarrativeOutputSchema,
  },
  async input => {
    const {output} = await ecoRideNarrativePrompt(input);
    if (!output) {
      throw new Error('Failed to generate eco-narrative output.');
    }
    return output;
  }
);
