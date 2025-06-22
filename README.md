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

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.
