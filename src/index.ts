import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// TypeScript/Angular best practices guidelines
const ANGULAR_GUIDELINES = `
# TypeScript, Angular, and Scalable Web Application Best Practices

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices
- Use strict type checking  
- Prefer type inference when the type is obvious  
- Avoid the \`any\` type; use \`unknown\` when type is uncertain  

## Angular Best Practices
- Always use standalone components over NgModules  
- Don't use explicit \`standalone: true\` (it is implied by default)  
- Use signals for state management  
- Implement lazy loading for feature routes  
- Use \`NgOptimizedImage\` for all static images  

## Components
- Keep components small and focused on a single responsibility  
- Use \`input()\` and \`output()\` functions instead of decorators  
- Use \`computed()\` for derived state  
- Set \`changeDetection: ChangeDetectionStrategy.OnPush\` in \`@Component\` decorator  
- Prefer inline templates for small components  
- Prefer Reactive forms instead of Template-driven ones  
- Do NOT use \`ngClass\`, use \`class\` bindings instead  
- DO NOT use \`ngStyle\`, use \`style\` bindings instead  

## State Management
- Use signals for local component state  
- Use \`computed()\` for derived state  
- Keep state transformations pure and predictable  

## Templates
- Keep templates simple and avoid complex logic  
- Use native control flow (\`@if\`, \`@for\`, \`@switch\`) instead of \`*ngIf\`, \`*ngFor\`, \`*ngSwitch\`  
- Use the async pipe to handle observables  

## Services
- Design services around a single responsibility  
- Use the \`providedIn: 'root'\` option for singleton services  
- Use the \`inject()\` function instead of constructor injection
`;

const CODE_EXAMPLES = {
  component: `
// Good: Modern Angular component with signals
import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  template: \`
    <div class="user-card" 
         [class.active]="isActive()"
         [style.background-color]="backgroundColor()">
      @if (user(); as currentUser) {
        <h3>{{ currentUser.name }}</h3>
        <p>{{ currentUser.email }}</p>
        @if (showActions()) {
          <button (click)="onEdit()">Edit</button>
        }
      }
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class UserCardComponent {
  user = input.required<User>();
  showActions = input(false);
  userUpdated = output<User>();
  
  backgroundColor = computed(() => this.isActive() ? '#e3f2fd' : '#fff');
  isActive = computed(() => this.user()?.status === 'active');
  
  onEdit() {
    this.userUpdated.emit(this.user());
  }
}
  `,
  service: `
// Good: Modern Angular service with inject()
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, signal } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private users = signal<User[]>([]);
  
  readonly users$ = this.users.asReadonly();
  
  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  
  updateUsers(users: User[]) {
    this.users.set(users);
  }
}
  `
};

class AngularGuidelinesServer {
  private readonly server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'angular-guidelines-server',
        version: '1.0.0',
        capabilities: {
          tools: {},
          prompts: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupPromptHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_angular_guidelines',
            description: 'Get comprehensive Angular and TypeScript best practices guidelines',
            inputSchema: {
              type: 'object',
              properties: {
                section: {
                  type: 'string',
                  description: 'Specific section to focus on (optional)',
                  enum: ['typescript', 'angular', 'components', 'state', 'templates', 'services', 'all']
                }
              }
            }
          },
          {
            name: 'get_code_example',
            description: 'Get code examples following Angular best practices',
            inputSchema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  description: 'Type of code example to get',
                  enum: ['component', 'service', 'all']
                }
              },
              required: ['type']
            }
          },
          {
            name: 'validate_angular_code',
            description: 'Validate Angular/TypeScript code against best practices',
            inputSchema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'The code to validate'
                },
                type: {
                  type: 'string',
                  description: 'Type of code (component, service, etc.)',
                  enum: ['component', 'service', 'general']
                }
              },
              required: ['code']
            }
          }
        ]
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_angular_guidelines':
            return this.getAngularGuidelines(args?.section);

          case 'get_code_example':
            return this.getCodeExample(args?.type);

          case 'validate_angular_code':
            return this.validateCode(args?.code, args?.type);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
      }
    });
  }

  private setupPromptHandlers() {
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: [
          {
            name: 'angular_code_review',
            description: 'Review Angular/TypeScript code for best practices compliance',
            arguments: [
              {
                name: 'code',
                description: 'The code to review',
                required: true
              }
            ]
          },
          {
            name: 'create_angular_component',
            description: 'Create a new Angular component following best practices',
            arguments: [
              {
                name: 'componentName',
                description: 'Name of the component to create',
                required: true
              },
              {
                name: 'features',
                description: 'Features the component should have (inputs, outputs, etc.)',
                required: false
              }
            ]
          }
        ]
      };
    });

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'angular_code_review':
          return {
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Please review this Angular/TypeScript code for best practices compliance:\n\n${args?.code}\n\nCheck against these guidelines:\n${ANGULAR_GUIDELINES}\n\nProvide specific feedback on what can be improved.`
                }
              }
            ]
          };

        case 'create_angular_component':
          return {
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `Create a new Angular component named "${args?.componentName}" following these best practices:\n${ANGULAR_GUIDELINES}\n\nFeatures requested: ${args?.features || 'Basic component structure'}\n\nEnsure the component uses modern Angular features like signals, standalone components, and proper TypeScript typing.`
                }
              }
            ]
          };

        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });
  }

  private getAngularGuidelines(section?: string) {
    let content = ANGULAR_GUIDELINES;
    
    if (section && section !== 'all') {
      const sectionMap: Record<string, string> = {
        typescript: 'TypeScript Best Practices',
        angular: 'Angular Best Practices',
        components: 'Components',
        state: 'State Management',
        templates: 'Templates',
        services: 'Services'
      };
      
      const sectionTitle = sectionMap[section];
      if (sectionTitle) {
        const lines = content.split('\n');
        const startIndex = lines.findIndex(line => line.includes(sectionTitle));
        const nextSectionIndex = lines.findIndex((line, index) => 
          index > startIndex && line.startsWith('## ') && !line.includes(sectionTitle)
        );
        
        if (startIndex !== -1) {
          const endIndex = nextSectionIndex !== -1 ? nextSectionIndex : lines.length;
          content = lines.slice(startIndex, endIndex).join('\n');
        }
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: content
        }
      ]
    };
  }

  private getCodeExample(type: string) {
    if (type === 'all') {
      return {
        content: [
          {
            type: 'text',
            text: `# Angular Code Examples\n\n## Component Example${CODE_EXAMPLES.component}\n\n## Service Example${CODE_EXAMPLES.service}`
          }
        ]
      };
    }

    const example = CODE_EXAMPLES[type as keyof typeof CODE_EXAMPLES];
    if (!example) {
      throw new Error(`No example available for type: ${type}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `# ${type.charAt(0).toUpperCase() + type.slice(1)} Example\n${example}`
        }
      ]
    };
  }

  private validateCode(code: string, type?: string) {
    const issues: string[] = [];
    
    // Basic validation checks
    if (code.includes('any')) {
      issues.push('❌ Avoid using "any" type - use specific types or "unknown" instead');
    }
    
    if (code.includes('*ngIf') || code.includes('*ngFor') || code.includes('*ngSwitch')) {
      issues.push('❌ Use native control flow (@if, @for, @switch) instead of structural directives');
    }
    
    if (code.includes('ngClass')) {
      issues.push('❌ Use [class] bindings instead of ngClass');
    }
    
    if (code.includes('ngStyle')) {
      issues.push('❌ Use [style] bindings instead of ngStyle');
    }
    
    if (code.includes('@Input()') || code.includes('@Output()')) {
      issues.push('⚠️ Consider using input() and output() functions instead of decorators');
    }
    
    if (type === 'component') {
      if (!code.includes('ChangeDetectionStrategy.OnPush')) {
        issues.push('⚠️ Consider using OnPush change detection strategy for better performance');
      }
      
      if (!code.includes('signal(') && !code.includes('computed(')) {
        issues.push('💡 Consider using signals for state management');
      }
    }
    
    if (type === 'service') {
      if (!code.includes('inject(')) {
        issues.push('⚠️ Consider using inject() function instead of constructor injection');
      }
      
      if (!code.includes("providedIn: 'root'")) {
        issues.push('💡 Consider using providedIn: "root" for singleton services');
      }
    }

    const result = issues.length > 0 
      ? `# Code Validation Results\n\n## Issues Found:\n${issues.map(issue => `- ${issue}`).join('\n')}\n\n## Guidelines:\n${ANGULAR_GUIDELINES}`
      : `# Code Validation Results\n\n✅ Code looks good! No major issues found.\n\n## Guidelines:\n${ANGULAR_GUIDELINES}`;

    return {
      content: [
        {
          type: 'text',
          text: result
        }
      ]
    };
  }

  private setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Angular Guidelines MCP server running on stdio');
  }
}

// Start the server
const server = new AngularGuidelinesServer();
server.run().catch(console.error);