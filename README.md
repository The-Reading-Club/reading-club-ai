# Reading Club AI – An AI-Powered Storytelling Editor 📖✨

## Introduction

**Reading Club AI** is a Next.js and TypeScript web application for collaborative children’s story writing. It leverages advanced AI (OpenAI GPT-4 for text and DALL·E 3 for images) to help users write and illustrate stories, making it a deeply AI-native product. The platform’s rich text editor and creative AI integrations enable a seamless experience of co-writing stories with an AI assistant.

[![Create & Share Your AI Story in 10 Mins! 🚀](https://img.youtube.com/vi/akCB1Keu_K8/hqdefault.jpg)](https://www.youtube.com/watch?v=akCB1Keu_K8)

## Repository & Architecture

This originally private repository, now open sourced, is provided as-is, organized into multiple packages/projects:

* **`my-app`** – the main Next.js 14 application (frontend + backend) for the product. This contains the web UI, API routes, and all core logic.
* **`packages/core/novel`** – a section of the code constitutes a custom modified version of the reusable rich text editor package ["Novel" by Steven Tey](https://github.com/steven-tey/novel) built on Tiptap.
* **`nextjs-app`** – a Next.js demo that tests the `novel` editor in isolation. For example, it imports the `<Editor>` from the `novel` package and renders it with some sample content, demonstrating how the editor can be integrated.
* **`my-tiptap-project`** – a mere playground Next.js app (from an earlier stage of development) for experimenting with Tiptap-based editor features.

The main app (`my-app`) is what matters and has the relevant features (user accounts, AI orchestration, etc.).

## Tech Stack & Tools

* **Next.js 14 (App Router)** – The main web app is built with Next.js’s latest App Router architecture in full-stack TypeScript, allowing React UI and serverless API routes in one project. This provides SSR, edge functions, and a structured way to define routes (e.g. `app/api/...` for backend endpoints).
* **TypeScript** – Used across the codebase for type safety and clarity of complex interactions (from editor commands to API responses).
* **OpenAI APIs (GPT-4 & DALL·E 3)** – Core to the product:

  * GPT-4 via OpenAI’s API for text generation (story continuations, suggestions).
  * DALL·E 3 via OpenAI’s image generation API for creating story illustrations.
* **Vercel AI SDK (`ai` library)** – Used on the backend to stream AI responses. For instance, the GPT-4 completion is streamed to the client using `OpenAIStream` and `StreamingTextResponse` from Vercel’s SDK, enabling token-by-token streaming in the UI.
* **Tiptap Editor (ProseMirror)** – A highly customizable rich-text editor framework. The app uses Tiptap’s React bindings and custom extensions to build a Notion-like editor tailored for story writing. For example, it includes the StarterKit and many extensions (highlight, image, link, placeholder, etc.), plus custom ones (detailed below).
* **UI/UX Libraries** – The interface uses **Tailwind CSS** for styling and **Radix UI** (via shadcn UI components) for accessible base components (e.g. dialogs, dropdowns). In the code, you can see Radix Dialog components for modals and Tailwind utility classes for layout and design.
* **State Management** – **Zustand** is used for client-side state (stores managing things like editor content, UI modals, user config) which keeps the React component logic clean.
* **Auth and Payments** – Integration with **NextAuth** for authentication and **Stripe** for subscription payments. (Dependencies for next-auth and stripe are present, and subscription logic appears in the code.) This enables a SaaS model with free and paid tiers.
* **Database & ORM** – Uses **Prisma** as the ORM (with a PostgreSQL or SQLite database) to persist user accounts, story data, usage counts, etc. The presence of `@prisma/client` and a schema suggests a structured backend for data.
* **Infrastructure** – Deployed on **Vercel**, leveraging:

  * **Vercel KV (Upstash Redis)** for caching and rate limiting.
  * **Vercel Blob Storage** for storing generated images and associated metadata.
  * Edge Functions (where appropriate) for low-latency AI responses (some API routes are configured to run on the edge).

[![Creating a relatable hispanic character like me with readingclub.ai 🚀](https://img.youtube.com/vi/QDBlzALxMOs/hqdefault.jpg)](https://www.youtube.com/watch?v=QDBlzALxMOs)

## Core Features and Modules

### 1. AI-Powered Story Continuation (GPT-4) 🤖📜

In Reading Club AI, the AI serves as a co-author for the user’s story. When the user requests the story to continue, the backend calls OpenAI’s **GPT-4** to generate the next part of the narrative. This is handled by a Next.js API route (`POST /api/generate`).

* **GPT-4 Chat Completion:** The API route constructs a chat completion request with the GPT-4 model. It sends a conversation consisting of a system message and the user’s last prompt (the story context or request). Notably, it sets `stream: true` to receive a streaming response.
* **Prompt Engineering:** The system message is carefully crafted to guide the AI’s writing style and output length. In the code, the system role says: *“You are an incredible children's book AI writing assistant... that continues existing text...”* and instructs the model to **limit its response to one or two short paragraphs** and not to write a full story. This prompt engineering ensures the AI expands the story in small, appropriate increments, letting the human writer stay in control of the narrative flow.
* **Streaming Responses:** As the AI generates text, the response is streamed back to the frontend. The code uses `OpenAIStream` and `StreamingTextResponse` to push tokens to the client in real-time. This means the writer can watch the AI’s suggestion appear character-by-character, creating a smooth autocomplete experience.

### 2. Rich Text Editor with Custom Extensions 📝✨

At the heart of the app is a **rich-text editor** built with Tiptap (a wrapper around ProseMirror). This editor is highly customized to support the storytelling and AI collaboration features. It’s also packaged as a standalone `novel` editor library for reuse. Key features of the editor include:

* **Custom *Suggestion* Mark:** The editor defines a custom Tiptap **Mark** extension named `"customSuggestion"` to highlight AI-generated text suggestions within the document. When the AI inserts text, it’s wrapped in this mark, which carries attributes like a color highlight and a UUID. The extension’s code specifies how to parse and render these marks – as `<mark>` HTML elements with a background color (data-color attribute) and a data-suggestion-id. This visual distinction lets users see AI-suggested text at a glance (e.g. highlighted in yellow) and potentially accept or reject those suggestions.
* **Structured AI Output:** The backend is aware of the editor’s structure and the custom mark. In fact, the prompt sent to GPT-4 for *interactive suggestions* explicitly asks the AI to return output in the editor’s JSON format, using the `customSuggestion` mark for any new text. The AI’s response therefore comes back as a structured JSON representing rich text (paragraphs, text nodes, marks), which the frontend can directly insert into the Tiptap editor document. This is a clever orchestration – by aligning the AI’s output format with the editor’s expected state, it eliminates the need for complex parsing and makes the AI a true *under-the-hood* part of the editor.
* **Slash Command Menu:** The editor features a Notion-style **slash ("/") menu** that allows users to insert special content or trigger actions by typing `/`. For example, one slash-command is “Generate Illustration” – when the user types `/` and selects *Generate Illustration*, it will open the illustration generation modal (see next section). The slash menu is implemented with a React component that listens to keyboard input and displays a list of commands filtered by the query. It handles arrow key navigation and selection, calling the appropriate command callback when an item is chosen. This provides an intuitive, in-context way to access AI features (like image generation) or insert templated content without leaving the editor.
* **Bubble Menu & Formatting:** In addition to slash commands, the editor uses Tiptap’s bubble menu extension for text formatting. The repository includes a `TRCEditorBubbleMenu` component, which would render a floating toolbar when you select text (for bold, italic, etc.). The styling and integration of this bubble menu are tailored to the app’s design. This makes formatting and interacting with the content feel polished and similar to familiar editors like Notion or Google Docs.

Overall, the custom editor demonstrates deep understanding of ProseMirror/Tiptap internals – from extending the schema with custom marks to managing input rules – showcasing an ability to bend a complex editor to the app’s will.

### 3. AI Image Generation Integration 🎨🖼️

A standout feature of Reading Club AI is the ability to generate **illustrations** for the story using AI. Through a combination of OpenAI’s DALL·E 3 model and in-app prompt refining tools, the user can create images that accompany their story text. The integration is thoughtfully designed:

* **Backend Orchestration:** When an illustration is requested (via a slash command or an “Add Image” button), the Next.js API route `/api/illustration` is invoked. This route prepares a detailed prompt for the image generation. If a specific character or scene is currently in focus, the code can include those details. For example, there’s a template prompt in the code that uses a character’s attributes (gender, name, appearance, clothing, pose, setting, etc.) to generate a descriptive image request. The system tries to create a consistent visual depiction of story characters by describing them in the prompt. It then calls the OpenAI image generation API via the official SDK, targeting the `dall-e-3` model.
* **Prompt Engineering for Images:** The code uses a novel approach to prompt DALL·E. Instead of sending the user’s prompt directly, it wraps it in a JSON-like meta-prompt that takes certain parameters that allow for consistency of characters' attributes, style, and even camera angles or scenery, aiding reproducibility.
* **Parallel Generation & Gallery:** To give users choices, the app can generate multiple images in parallel. Instead of one `n` parameter (since DALL·E 3 doesn’t support `n>1` in a single request), the code triggers several promises of the `callDalleAPI` in parallel. In the `IllustrationModal` component, they set `nGenerations = 4` and call the generation function 4 times concurrently. Once all promises resolve, the results (image URLs and any revised prompts) are collected into a **gallery**. The UI of the modal then displays these images in a grid, so the user can scroll through four different AI-generated illustrations for the same prompt. This greatly improves user experience, as they can pick the image that best fits their vision. The gallery state is even cached in `localStorage` so that if the user re-opens the modal for the same prompt, the images persist (avoiding re-generation unless needed).
* **Inserting Images into the Editor:** When the user clicks on one of the generated images in the modal’s gallery, that image is inserted into the story. The code snippet shows that on image click, it calls `insertImageSrcIntoTiptapEditor(...)` with the image URL and alt text (prompt). This function interacts with a Tiptap image extension to create an `<image>` node at the current cursor position in the document. The image node would include the `src` (pointing to the generated image URL) and the `alt` text (for accessibility, using the prompt as description). Immediately after inserting the image, the modal closes, returning the user to the editor with the new image in place. From the user’s perspective, it feels like the AI just “dropped” an illustration into their story.
* **Storage & Performance:** Generated images are handled efficiently. Instead of relying on OpenAI’s temporary URLs (which expire after a short time), the code uploads each image to **Vercel Blob Storage** and gets a persistent URL. This offloads image hosting to a CDN-backed storage, making image loading faster and more reliable for all users. Additionally, for each image, a JSON metadata file is saved alongside it containing details like the original prompt, the exact `revised_prompt` from DALL·E (the API sometimes adjusts prompts slightly), and a timestamp. This metadata could be useful for audit trails, future features (like an image gallery or “re-generate similar image”), or simply for the creator to recall what prompt produced the image. The app also keeps track of usage – every successful generation increments a counter (and hitting certain limits will trigger upgrade prompts), ensuring the free tier constraints are enforced even across image generation (the code shows a toast notification and a modal if a rate limit is hit, prompting the user to consider the Pro plan).

### 4. Character Management & Advanced LLM Orchestration 🧙‍♂️📑

* The system can analyze the story text to **identify new characters** that the user has introduced and that might need illustration or tracking. In the code, there’s a function `callOpenaiIdentifyCharacter` and logic to parse “newCharacters” from the story context. This sends the story text to an AI (GPT-4) asking it to list any characters not seen before.
* Once new characters are identified, another AI call can **generate character descriptions or profiles**. The code references `callOpenAIAPICreateCharacter` which takes a character name and produces details like age, appearance, personality, etc., storing them as `characterDefinitions`. This is used to inform the writer (e.g., with a sidebar of character cards) or to feed into image generation.
* Those character details are then used when generating an illustration of that character. For example, if the user requests an image of a character, the prompt template fills in the character’s name, hair color, eye color, clothing, pose, etc., automatically. This ensures the AI image is consistent with the story’s portrayal of the character.
* The app might maintain a state of **existing characters** in the story (using Zustand store or similar). When an illustration is generated, it considers `existingCharacters` and `chosenCharacter` from the editor’s state to decide if the image should focus on someone specific. New characters found by the AI could be added to this state for future reference.

These features demonstrate a forward-thinking design: multiple AI systems (text and image models) working together to assist in storytelling. It’s not hard to imagine possible extensions of Reading Club AI where you have an AI “librarian” tracking the lore (characters, locations) and an AI “artist” creating visuals, all coordinating with the AI “writer” – a true ensemble of AI helpers for creativity.

### 5. Subscriptions, Rate Limits, and Infrastructure 🛡️💰

Reading Club AI isn’t just a toy app – it’s built with **production-scale considerations** like user accounts, subscription plans, and rate limiting. This shows solid backend engineering to complement the AI features:

* **Authentication & Payments:** The app uses **NextAuth** (`/src/auth.ts`) for user authentication, supporting providers like Email/Password or OAuth, and **Stripe** for handling payments. Users can sign up and optionally upgrade to a Pro plan. The presence of a `checkSubscription()` function and subscription logic indicates that certain features (or usage limits) are gated for free vs. paid users. For example, a free user might have a daily cap on AI calls.
* **Free vs Paid Tier Enforcement:** Throughout the API routes, there are checks to enforce limits. For instance, every call to the `/api/generate` or `/api/illustration` route invokes `validatePaidSubscription(request, { feature: ... })` with a token bucket (sliding window) algorithm. If the user exceeds their allowance (e.g. more than N generations in 24 hours for free tier), the API returns an error. These guardrails protect the system from abuse and control costs (since each AI call costs money).
* **Rate Limiting (Upstash KV):** Apart from subscription checks, an additional layer of rate limiting uses Upstash Redis (exposed via Vercel KV). The code demonstrates setting up a rate limiter with fixed windows, keyed by user or IP, to cap usage. If the limit is exceeded, a `NextResponse` with status 429 is returned, signaling “Rate limit exceeded”. This is important for preventing spam or denial-of-service, especially on open endpoints or for non-logged-in usage.
* **Data Persistence:** Using **Prisma**, **MySQL**, and even **Convex** (a real-time DB), the app stores story content, user info, and analytics in the relevant kind of database. You'll see `@prisma/client` in use and references to data models (for example, maybe a `Story` model or user profile with a remaining quota). This means a user can log in from a different device and still access their saved stories and usage stats – crucial for a real product.
* **Deployment & Scaling:** The code is written with Next.js best practices, making it cloud-ready. Static content (editor bundle, etc.) is served efficiently, and dynamic functions (AI calls) run serverlessly. By using Vercel Edge where possible and optimizing the functions (e.g., `maxDuration = 300` seconds set for long image generations), the app is prepared to handle many concurrent users. Storing large blobs (images) outside the database (in Blob Storage) keeps the app responsive and the database lean. Logging (with plenty of `console.log` in code during dev) can be replaced by real monitoring in production. All these decisions reflect an understanding of building a **scalable SaaS** application.

## File Structure Highlights 📂🔍

Here’s an overview of the repository’s key folders and files:

* **`my-app/`** – The main Next.js application.

  * **`src/app/`** – Next.js App Router pages and API routes.

    * `page.tsx`, `layout.tsx`, etc. for the landing pages or main UI.
    * **`api/generate/route.ts`** – Endpoint for GPT-4 story generation.
    * **`api/chat/route.ts`** – Endpoint for interactive chat suggestions. Notably contains logic for JSON-formatted responses with `customSuggestion` marks.
    * **`api/illustration/route.ts`** – Endpoint for context-based image generation (calls DALL·E with story context).
    * **`api/illustration/prompt/route.ts`** – Endpoint for prompt-based image generation (calls DALL·E with a direct prompt).
    * (Other API routes for character identification, creation, etc., under `api/character/` – currently mostly experimental).
  * **`src/components/TRCEditorV2/`** – The custom **The Reading Club Editor** components and extensions.

    * **`index.tsx`** – Initializes the editor, combining the Tiptap extensions (StarterKit, Placeholder, Image, CustomSuggestion, etc.) and setting up the `<EditorContent />` area. This is the main editor React component, used in the page.
    * **`extensions/`** – Custom Tiptap extension definitions. For example:

      * `custom-suggestion.ts` – Mark extension for AI suggestion highlights.
      * `slash-command/` – Contains the slash command extension logic, e.g., how the editor recognizes “/” and triggers the menu, and the UI components for the menu (`CommandList.tsx` with the React component for the dropdown).
      * Possibly other custom extensions like placeholders or collaborative editing if any.
    * **`plugins/`** – Higher-level editor plugins. Notably `upload-generate-images/` which contains:

      * `illustration-generation-start.ts` and `illustration-generation-handle.ts` – logic for initiating an illustration generation and handling the result, interfacing between the editor and the API calls.
      * Functions like `startIllustrationGeneration`, `insertImageSrcIntoTiptapEditor` are defined here to glue the editor UI with the AI backend.
    * **`components/`** – React components closely tied to the editor UI.

      * `TRCEditorBubbleMenu/` – The floating menu for text formatting actions.
      * `EditorPageWrapper/` – Possibly a layout around the editor (including sidebar, character list, etc.). In fact, there’s `EditorPageWrapper/CharacterList` CSS and components, implying a sidebar listing characters in the story for quick reference.
      * Other sub-components for the editor page might include toolbars, buttons for “continue story” or “add image”, etc., each leveraging Zustand state and context.
  * **`src/components/modals/`** – Reusable modal dialogs. For example:

    * `IllustrationModal.tsx` – The modal for AI image generation prompt input and gallery display. It uses Radix Dialog under the hood and ties into the editor (via `useTRCEditorStore`) to insert images.
    * Possibly `ProModal` or similar – a modal that pops up when the user hits a limit and needs to upgrade (the code references `useProModal`).
  * **`src/stores/`** – Zustand store definitions for global state management. Includes:

    * `store.ts` – combining multiple slices or contexts (like one for app configuration, one for editor state). For instance, `useTRCAppConfigStore` holds UI text (dictionary for internationalization strings), theming, and usage counters. `useTRCEditorStore` might hold the editor instance, story data (including characters), etc., enabling different components to sync without prop drilling.
  * **`src/lib/`** – Utility libraries and configs.

    * `utils.ts` – General helpers (string functions, `devAlert` for development logging, etc.). We saw utilities for hashing (SHA256 for image URLs), and debouncing, etc.
    * `subscription.ts` – Contains `checkSubscription()` and `validatePaidSubscription()` implementations, tying into Stripe and Upstash to determine if a request should proceed or be halted.
    * `internationalization/` – There’s a `dictionary.ts` which presumably holds strings for different locales (the code references `dictionary` for UI text like slash command titles and toast messages). This hints at the app being prepared for translation.
    * Other libs: hooks (e.g. `useModals` hook to open/close modals), possibly API client helpers for calling internal APIs from the frontend, etc.
  * **`prisma/schema.prisma`** – Schema for the database (not open in our browsing, but with Prisma involved, we expect models like User, Subscription (with Stripe customer ID, plan, etc.), Story, Image, Character, etc.).
  * **`auth.ts`** – NextAuth configuration, defining providers and adapters (the code uses `@auth/prisma-adapter` and has GitHub/Google auth options and email/password).
  * **Misc Config**: `next.config.js`, `tsconfig.json`, etc., plus Tailwind config and PostCSS, which are standard for Next.js projects. Also, environment variables (not in repo) would include `OAI_KEY` for OpenAI, `DATABASE_URL` for Prisma, `NEXTAUTH_SECRET`, `STRIPE_API_KEY`, etc.

* **`packages/core/novel/`** – This popular editor package inspired a lot of the code in `TRCEditorV2` but generalized. The presence indeed references to the open-source Novel project by Steven Tey ([steven-tey/novel](https://github.com/steven-tey/novel)) in `nextjs-app`.

* **`nextjs-app/`** – A minimal Next.js app that tests the `novel` editor package. Its `pages` (or `app`) contains just an example usage of the editor. Indeed, in `src/app/page.tsx`, it simply renders `<Editor defaultValue={...} />` with some initial content. This content highlighted the editor’s features (headings, slash commands, code blocks, task list, etc.) and even included a sample image with a URL. This sub-app is great for testing the editor in isolation during development.

* **`my-tiptap-project/`** – Another Next.js app. This was an earlier playground to prototype the editor features before integrating them into the main app. Its presence tells a story of the development process (starting small and then moving into the main structure).

## Conclusion & Technical Highlights 🚀🌟

This project is a testament to [José A. Alvarez Cabrera's (@josealvarez97)](https://github.com/josealvarez97/) skills as the technical co-founder, demonstrating a rare blend of front-end finesse, backend architecture, and AI integration:

* **Full-Stack TypeScript Expertise:** José built a complex application using modern frameworks (Next.js 14, React 18) entirely in TypeScript. From database schemas to React components, the type safety and clarity in the code reduce bugs and make the development process more efficient. This also shows up in how he managed state (Zustand for predictable state management) and structure the project (monorepo with shared packages), indicating strong software engineering fundamentals.
* **AI-Native Design:** Rather than treating AI as a bolt-on feature, José has woven it into the fabric of the product. The editor and the AI talk in the same language (JSON document structures with special marks). Features like streaming text generation and one-click image creation are not trivial to implement – but José made them feel like natural extensions of the writing experience. This “AI-first” approach required deep understanding of OpenAI’s capabilities and limitations, which José navigated with skill (e.g. circumventing DALL·E’s one-image limit, structuring prompts for reliability).
* **Custom Editor Development:** Building a rich text editor with custom behavior is notoriously challenging, yet José succeeded in extending Tiptap to meet his needs. Implementing a custom mark and menu systems involves delving into low-level editor mechanics (schema, commands, key bindings). José's ability to do this highlights a strong competency in front-end development.
* **Clever Prompt Engineering & LLM Orchestration:** José demonstrated that he can work creatively with AI models. The prompt engineering in the system message to keep GPT-4 “in check” for children’s stories, and the JSON-format forcing for suggestions, show a practical understanding of how to get the best outputs. Moreover, orchestrating multiple AI calls (GPT-4 for text, DALL·E for images, possibly GPT-4 again for character analysis) means José was essentially designing multi-agent AI systems. Since 2024, this was and still is cutting-edge work in the AI product space, requiring careful consideration of each step’s output format and how it feeds the next – and José tackled it head-on.
* **Robust System Design for Scale:** Beyond the AI and UI, José implemented the boring-but-critical parts of a SaaS product: auth, subscriptions, rate limiting, and performance optimizations. For example, using Upstash Redis to throttle usage, integrating Stripe for monetization, and offloading heavy content to a CDN (Vercel Blob) are decisions that ensure the app can grow and handle real users. Embracing edge functions and streaming also means users get fast, interactive responses. All these are marks of a developer who not only builds cool demos but also engineers real-world applications ready for production.

In summary, *Reading Club AI* is more than just a code repository – it’s a showcase of innovative problem solving at the intersection of **web development and artificial intelligence**. The architecture is clean and modular, the features are ambitious and well-implemented, and the codebase clearly reflects José's ability to wear many hats: front-end developer, back-end developer, and AI engineer. José is proud in having created a deeply AI-native product that was both fun and technically ambitious. 🎉🚀

### [⬇️⬇️ Check out Product Hunt 2024 launch ⬇️⬇️](https://www.producthunt.com/posts/readingclub-ai?utm_source=other&utm_medium=social)

[![readingclub.ai Enable Creative Writing at Any Literacy Level](https://img.youtube.com/vi/kU_exK_0oxI/hqdefault.jpg)](https://www.producthunt.com/products/readingclub-ai)


