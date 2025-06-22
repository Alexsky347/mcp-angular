# Angular Guidelines MCP Server

A Model Context Protocol (MCP) server that provides Angular and TypeScript best practices guidelines.

## Overview

This project implements a Model Context Protocol (MCP) server that provides AI assistants with tools and prompts for Angular and TypeScript development. It enables AI tools to:

- Access comprehensive Angular and TypeScript best practices guidelines
- Get code examples following modern Angular patterns
- Validate Angular/TypeScript code against best practices
- Generate Angular components following best practices

## Features

### Tools

1. **get_angular_guidelines** - Get comprehensive Angular and TypeScript best practices guidelines
   - Optional section parameter to focus on specific areas (typescript, angular, components, state, templates, services)

2. **get_code_example** - Get code examples following Angular best practices
   - Available examples: component, service, or all

3. **validate_angular_code** - Validate Angular/TypeScript code against best practices
   - Checks code for common anti-patterns and suggests improvements

### Prompts

1. **angular_code_review** - Review Angular/TypeScript code for best practices compliance
2. **create_angular_component** - Create a new Angular component following best practices

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone [https://github.com/Alexsky347/mcp-angular]
   cd mcp-angular
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the project
   ```bash
   npm run build
   ```

## Usage

Create a new file .vscode/mcp.json:
```json
{
  "servers": {
    "angularGuidelines": {
      "type": "stdio",
      "command": "node",
      "args": ["path/to/your/mcp-server/build/index.js"],
      "env": {}
    }
  }
}
```

### Starting the Server

Run the server:

```bash
npm start
```

The MCP server runs on stdio, allowing it to be easily integrated with AI tools that support the Model Context Protocol.

### Development Mode

For development with automatic recompilation:

```bash
npm run dev
```

### Integration

This server can be integrated with any AI assistant that supports the Model Context Protocol. It provides tools and prompts that help the AI give better guidance for Angular development.

## Guidelines Included

The server provides guidance on:

- TypeScript best practices
- Angular best practices
- Component design
- State management
- Template patterns
- Services design

## Testing Angular MCP Server in VS Code Copilot

This guide shows you how to test your Angular guidelines MCP server with real Angular code in VS Code.

### Prerequisites Checklist

- ✅ MCP server is built and running
- ✅ VS Code has chat.mcp.enabled: true
- ✅ .vscode/mcp.json is configured in your Angular project
- ✅ MCP server appears in MCP: List Servers command

### Step 1: Verify MCP Server is Working

1. Open VS Code in your Angular project
2. Press Ctrl+Shift+P and run MCP: List Servers
3. You should see angularGuidelines with a green status
4. If red, click it and select Show Output to see errors

### Step 2: Test in Agent Mode

Open Chat and Enable Agent Mode:

1. Press Ctrl+Alt+I to open Chat view
2. Select Agent mode from the dropdown (very important!)
3. Click the Tools button to verify your tools appear:
   - get_angular_guidelines
   - get_code_example
   - validate_angular_code

### Step 3: Test Basic Tool Access

#### Test 1: Get Guidelines
```
#get_angular_guidelines

Show me the Angular component best practices
```
Expected Result: Should display your complete guidelines or component-specific section.

#### Test 2: Get Code Examples
```
#get_code_example component

Show me an example of a modern Angular component
```
Expected Result: Should show the component example with signals, standalone components, etc.

### Step 4: Test Code Generation

#### Test 3: Create New Component
```
Create an Angular component for displaying user profiles. The component should:
- Accept a user object as input
- Emit an event when the user is clicked
- Show/hide edit button based on permissions
- Use modern Angular features following the guidelines
```
Expected Behavior:
- Copilot should automatically invoke your MCP tools
- Generated code should follow your guidelines (signals, standalone, etc.)

#### Test 4: Create Service
```
Create an Angular service for managing user data with:
- Load users from API
- Cache users in memory
- Provide observable of current users
- Follow the best practices from guidelines
```

### Step 5: Test Code Review & Validation

#### Test 5: Review Bad Code
Paste this intentionally bad Angular code and ask for review:
```typescript
// Bad example - paste this in chat
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bad-user',
  template: `
    <div *ngIf="user" [ngClass]="{'active': isActive}" [ngStyle]="{'color': textColor}">
      <h3>{{ user.name }}</h3>
      <button *ngIf="showEdit" (click)="editUser()">Edit</button>
    </div>
  `
})
export class BadUserComponent {
  @Input() user: any;
  @Input() showEdit: boolean = false;
  @Output() userEdit = new EventEmitter<any>();
  
  isActive: boolean = true;
  textColor: string = '#333';
  
  constructor(private userService: UserService) {}
  
  editUser() {
    this.userEdit.emit(this.user);
  }
}
```

Then ask:
```
Review this Angular component code and suggest improvements based on the guidelines
```

Expected Result: Should identify issues like:
- Using any type
- Old structural directives (*ngIf)
- ngClass and ngStyle usage
- Old @Input()/@Output() decorators
- Constructor injection instead of inject()

#### Test 6: Validate Good Code
Paste this good code:
```typescript
// Good example - paste this in chat
import { Component, input, output, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-good-user',
  template: `
    @if (user(); as currentUser) {
      <div [class.active]="isActive()" [style.color]="textColor()">
        <h3>{{ currentUser.name }}</h3>
        @if (showEdit()) {
          <button (click)="editUser()">Edit</button>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodUserComponent {
  private userService = inject(UserService);
  
  user = input.required<User>();
  showEdit = input(false);
  userEdit = output<User>();
  
  isActive = computed(() => this.user()?.status === 'active');
  textColor = computed(() => this.isActive() ? '#007acc' : '#333');
  
  editUser() {
    this.userEdit.emit(this.user());
  }
}
```

Then ask:
```
#validate_angular_code

Validate this component code against our guidelines
```
Expected Result: Should give positive feedback and confirm it follows guidelines.

### Step 6: Test Prompts

#### Test 7: Use Built-in Prompts
Type / in the chat input and look for:
- /mcp.angularGuidelines.angular_code_review
- /mcp.angularGuidelines.create_angular_component

Test the component creation prompt:
```
/mcp.angularGuidelines.create_angular_component UserDashboard "inputs for user data, outputs for navigation events, computed properties for user stats"
```

### Step 7: Test Real-World Scenarios

#### Test 8: Fix Existing Component
Open an actual component file in your Angular project, then:
```
I have this component [paste your actual component code]. Please review it and suggest specific improvements based on our Angular guidelines. Then show me the refactored version.
```

#### Test 9: Generate Form Component
```
Create a reactive form component for user registration with:
- Email and password fields
- Form validation
- Submit and cancel events
- Loading state management
- Follow our Angular best practices
```

#### Test 10: Service with HTTP
```
Create a service that handles CRUD operations for users with:
- HTTP client integration
- Error handling
- Loading states using signals
- Caching mechanism
- Following our service guidelines
```

### Expected Behaviors

#### ✅ Good Signs:
- Tools appear in Agent mode Tools list
- MCP tools are automatically invoked for Angular questions
- Generated code uses signals, standalone components
- Code reviews catch guideline violations
- Prompts work when typed with /

#### ❌ Problems to Check:
- Tools don't appear → Check Agent mode is selected
- Server errors → Check MCP: List Servers → Show Output
- Guidelines not followed → Server may not be properly invoked
- No tool invocation → Try explicitly using #tool_name

### Advanced Testing

#### Test 11: Context Awareness
```
I'm working on an Angular 17+ project. Create a data table component that displays users with sorting and filtering capabilities. Make sure it follows our strict guidelines about signals and standalone components.
```

#### Test 12: Migration Help
```
Help me migrate this old Angular component to use the modern patterns from our guidelines:
[paste old component with NgModules, old decorators, etc.]
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.
