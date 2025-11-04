# 4Trades Voice Agent Onboarding - Frontend

A modern, responsive Next.js application for onboarding trade businesses to their AI voice agent platform.

## 🎯 Features

- **Secure Authentication**: JWT-based signup and login
- **Multi-Step Onboarding**: 6-step wizard with form validation
- **Auto-Save Progress**: Real-time progress saving to backend
- **Beautiful UI**: Shadcn/ui components with zinc color scheme
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Status Tracking**: View submission status after completion

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript/React
- **UI Components**: Shadcn/ui
- **Styling**: TailwindCSS (Zinc theme)
- **Form Validation**: React Hook Form + Zod
- **Toast Notifications**: Sonner
- **Font**: Poppins (Google Fonts)
- **HTTP Client**: Native Fetch API

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend server running (vasop-server)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
vasop-client/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.js              # Landing page (redirects)
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── onboarding/          # Main onboarding flow
│   │   ├── status/              # Submission status page
│   │   ├── layout.js            # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── onboarding/          # 6 step components
│   │   │   ├── ProgressIndicator.jsx
│   │   │   ├── Step1BusinessProfile.jsx
│   │   │   ├── Step2VoiceAgent.jsx
│   │   │   ├── Step3CollectionFields.jsx
│   │   │   ├── Step4EmergencyHandling.jsx
│   │   │   ├── Step5EmailConfig.jsx
│   │   │   └── Step6Review.jsx
│   │   └── ui/                  # Shadcn/ui components
│   ├── contexts/
│   │   └── AuthContext.jsx      # Authentication context
│   └── lib/
│       └── api.js               # API client functions
├── public/                      # Static assets
├── package.json
├── next.config.mjs
├── tailwind.config.js
└── components.json              # Shadcn/ui config
```

## 🔐 Authentication Flow

### Signup

1. User fills form: name, email, phone, password
2. Form validated with Zod schema
3. POST request to `/auth/signup`
4. JWT token saved to localStorage
5. User context updated
6. Redirect to `/onboarding`

### Login

1. User enters email and password
2. POST request to `/auth/login`
3. JWT token saved to localStorage
4. User context updated
5. Redirect to `/onboarding`

### Protected Routes

All onboarding routes check authentication:
- No token → Redirect to `/login`
- Invalid token → Redirect to `/login`
- Valid token → Load user profile

## 📝 Onboarding Steps

### Step 1: Business Profile
- Business name, industry, website
- Phone, email
- Address (street, city, state, zip)
- Business hours

### Step 2: Voice Agent Configuration
- Agent name
- Agent personality (dropdown)
- Greeting message (with auto-generate)
- Live preview

### Step 3: Information Collection
- Standard fields (name, phone, email, reason, etc.)
- Custom questions (unlimited)

### Step 4: Emergency Handling
- Enable/disable emergency forwarding
- Emergency phone number
- Trigger method: "Press # Key"

### Step 5: Email Configuration
- Recipient email for call summaries
- Enable/disable email summaries
- Email preview

### Step 6: Review & Submit
- Review all information
- Edit any section
- Submit for admin review

## 🎨 UI Components

Built with Shadcn/ui:

- `Button`: Primary actions
- `Input`: Text fields
- `Label`: Form labels
- `Card`: Content containers
- `Select`: Dropdowns
- `Checkbox`: Boolean inputs
- `RadioGroup`: Single choice
- `Switch`: Toggle switches
- `Textarea`: Multi-line input

### Color Scheme

- **Background**: zinc-100 (light gray)
- **Foreground**: zinc-900 (dark gray)
- **Primary**: zinc-900
- **Accent**: zinc-800

### Animations

- `animate-fade-in`: Smooth fade-in on page load
- `animate-slide-up`: Slide up from bottom

## 📡 API Integration

### API Client (`src/lib/api.js`)

```javascript
import { authAPI, onboardingAPI } from '@/lib/api';

// Authentication
await authAPI.signup({ name, email, phone, password });
await authAPI.login({ email, password });
await authAPI.getProfile();
authAPI.logout();

// Onboarding
await onboardingAPI.saveProgress({ currentStep, businessProfile, ... });
await onboardingAPI.getMySubmission();
await onboardingAPI.submit({ businessProfile, voiceAgentConfig, emailConfig });
```

### Authorization

All protected endpoints require JWT token:

```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

Token is stored in `localStorage` as `vasop-token`.

## 🔄 State Management

### AuthContext

Global authentication state:

```javascript
const { user, isLoading, login, signup, logout } = useAuth();
```

- `user`: Current user object or null
- `isLoading`: Loading state during initial check
- `login(credentials)`: Async login function
- `signup(userData)`: Async signup function
- `logout()`: Clear auth state

### Form State

Each step manages its own form state with React Hook Form:

```javascript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

### Onboarding State

Main onboarding page manages:
- `currentStep`: Current step number (1-6)
- `formData`: All form data from all steps
- Auto-save to backend on step completion

## 🧪 Form Validation

Using Zod schemas:

```javascript
const businessProfileSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(1, "Please select an industry"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  // ... more fields
});
```

Validation happens on:
- Field blur
- Form submission
- Real-time for specific fields

## 📱 Responsive Design

Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Key responsive features:
- Stacked forms on mobile
- Side-by-side fields on desktop
- Sticky header navigation
- Responsive card layouts

## 🎯 User Experience

### Loading States

- Spinner during authentication check
- Button loading states during API calls
- Skeleton loaders for data fetching

### Error Handling

- Form validation errors inline
- API errors shown as toast notifications
- Graceful fallbacks for network issues

### Success Feedback

- Toast notifications for successful actions
- Progress indicator showing current step
- Confirmation dialogs for important actions

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Adding Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

### Custom Styling

Edit `src/app/globals.css` for global styles:

```css
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`
4. Deploy

### Other Platforms

Build the app:
```bash
npm run build
```

Start the server:
```bash
npm run start
```

Ensure environment variables are set.

## 🐛 Troubleshooting

### "Cannot connect to API"
- Verify `NEXT_PUBLIC_API_URL` is set
- Check backend server is running
- Verify CORS is configured on backend

### "Token expired" errors
- JWT token expires after 7 days
- User needs to log in again
- Clear localStorage: `localStorage.clear()`

### Styling issues
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TailwindCSS configuration

### Hydration errors
- Ensure no server/client mismatch
- Check `"use client"` directive on interactive components
- Verify no direct DOM manipulation

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [TailwindCSS](https://tailwindcss.com)

## 📞 Support

For issues or questions:
- Check `/docs/END_TO_END_APPLICATION_FLOW.md` for detailed documentation
- Email: doug@sherpaprompt.com

## 📄 License

Proprietary - 4Trades Voice Agent Onboarding Platform

---

**Version**: 1.0  
**Last Updated**: November 3, 2025
