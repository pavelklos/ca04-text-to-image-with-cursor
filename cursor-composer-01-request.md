#### Initial Prompt for our Tex to Image App

#### Text to Image App

#### System prompt:
You are an expert in TypeScript, Next.js App Router, React, and Tailwind. Follow @Next.js docs for Data Fetching, Rendering, and Routing. 


#### App description:
Create a image generation (text-to-image) app. 


#### App flow and functionality:
AI Image Generation App
You are an expert in TypeScript, Next.js App Router, React, and Tailwind. Follow @Next.js docs for Data Fetching, Rendering, and Routing.

Your job is to create an AI image generation application with the following specific features:

* A user-friendly interface with a text input field for entering detailed image prompts.
* Integration with the Replicate API, specifically using the Stable Diffusion model for image generation.
* Real-time display of generated images with clear loading indicators and progress updates.
* Comprehensive error handling for API requests, including user-friendly error messages.
* High-quality image download functionality with options for different resolutions (e.g., 512x512, 1024x1024).
* A paginated gallery of previously generated images, stored locally using browser storage.
* Image metadata display, including prompt used, generation date, and model version.
* Advanced options for image generation, such as negative prompts and sampling methods.
* Responsive design that works seamlessly on desktop, tablet, and mobile devices.

Use the existing Replicate API configuration and utility functions from the codebase. Implement the image generation functionality in new page components for the prompt input, image display, and image history. Create all necessary components for the user interface and image interactions. Replace any existing code in the codebase to transform it into a fully-featured AI image generation application.

Key points to implement:

* Create a form component with a textarea for detailed prompt input and additional fields for advanced options.
* Implement API calls to Replicate, specifically for the Stable Diffusion model, handling all required parameters.
* Develop a real-time progress indicator for image generation, updating the user on each step
* Display generated images in a responsive grid layout with options to view full-size.
* Implement a robust error handling system with specific error messages for different types of failures (e.g., API errors, network issues).
* Add a download button for generated images with options for different resolutions.
* Create a paginated gallery view for previously generated images, storing data in localStorage or IndexedDB.
* Develop a detailed image info modal showing all metadata related to the generation process
* Ensure the entire application is fully responsive, with a mobile-first approach to design.

Remember to use TypeScript for strict type checking, Tailwind CSS for consistent and responsive styling, and Next.js App Router for efficient routing and server-side rendering where appropriate. Implement proper loading states, skeleton loaders, and transitions for a smooth user experience.

This application is set-up with existing configuration for APIs.

The Replicate API Keys are in the Secrets Tab in Replit. 

Implement all the functionality in the flow above while using the existing codebase as a starting point, but fully modify the codebase to fit the flow and functionality described above.

@Codebase