# Toast System Overview

This document provides an overview of the toast notification system implemented in `old-toast.js`.

## Components

The codebase consists of two main classes:

1. `Toast` - A general-purpose notification system
2. `ResumeApplicationToast` - A specialized toast for application resumption

## Toast Class

The `Toast` class provides a framework for displaying notification messages to users, with optional action buttons.

### Key Features

- **Static Functionality**: Implemented as a singleton with static methods and properties
- **Dynamic Creation**: Creates DOM elements on-demand
- **Action Support**: Allows for adding clickable action buttons with callbacks
- **Loading State**: Supports loading indicators during async operations
- **Visibility Controls**: Methods to show/hide the toast notification

### Main Methods

- `create(message, action)`: Initializes and displays a toast with the specified message and action
- `setMessage(text)`: Updates the displayed message
- `setAction(text, callback)`: Configures the action button with text and callback function
- `showLoader()` / `hideLoader()`: Toggles loading state for async operations

## ResumeApplicationToast Class

This specialized class extends the functionality of the basic toast to handle application resumption, particularly for users who have previously started an application process.

### Key Features

- **API Integration**: Fetches visitor data from an API endpoint
- **Contextual UI**: Shows different messages and actions based on user's application state
- **Automatic Initialization**: Self-initializes when the script loads

### Application States

The toast displays different messages based on three possible states:

1. User has an active docket without an active applicant flow
2. User has an active docket
3. User has a recently created offer

### Workflow

1. When initialized, fetches visitor data from `/api/v1/visitors`
2. Determines the appropriate message and action based on visitor state
3. When the action button is clicked, redirects the user to resume their application
4. If errors occur during redirection, displays a helpful error message with contact information

## Initialization

The code automatically initializes a `ResumeApplicationToast` instance when loaded, with the predefined domain "https://get.point.com".

```javascript
(async () => {
  const prequalDomain = "https://get.point.com";
  const resumeApplicationToast = new ResumeApplicationToast();
  await resumeApplicationToast.init();
})();
```

This self-executing function ensures the toast will appear (if appropriate) without requiring explicit initialization elsewhere in the application.
