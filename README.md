## File Upload UI

- **File Upload Component**: Allows users to upload a file, which updates a central list with a default "Pending" status. The component follows the design provided in the Figma file.
- **File Status Display**: Displays file information, including the filename and status, based on a predefined list with three status types:
  - `0` - Pending
  - `1` - Successfully processed
  - `-1` - Failed to process

## Why Context API instead of Redux?

Since the application only requires a simple state management solution for file upload and status management,I decided to use Context API as it is lightweight and I think suits this need better. It is straightforward and less complex than Redux. It is well-suited for projects with minimal state management requirements and fewer components involved in the state sharing.

## Design Choices

1. **File Upload UI**: The file upload UI follows the design provided in the Figma link.
2. **File Table Display**: The main page for viewing file information and statuses uses a simple table structure. As the primary focus is to display a list of files with their respective statuses, a basic table layout ensures clarity and ease of use and mainly because I focused more on building UI of the file upload component as per the guidlines.

## Usage

- Each file in the table displays a filename and its current status.
- To upload a file, click on `upload File`, this will redirect you to the page with the file upload component.
- Select a file from your system (you can also drag and drop). The file will be added to the file list with a default "Pending" status.

### Code Organization

- **`context/FileContext.js`**: This file contains the context setup, functions to manage `filesData` globally, and state management to access `filesData`.
- **`components/FileUpload.js`**: Contains the main file upload component.
- **`components/FilesTable.js`**: Contains the table with files statuses.

## Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/falakthkr/file-upload-ui.git
   ```

2. Navigate to the project directory:

   ```bash
   cd file-upload-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Future Enhancements

Some potential features that could be added include:

- File validation checks (e.g., format, size limits)
- Finding a more efficient way to handle stages instead of switch cases

## Idea

I intially thought of opening up a modal with the file upload component in it, I thought it's better in terms of a user's point of view with the reduces redirects and navigations, but since I saw the guideline also included for me to showcase my router knowledge using the next router (Implement a file upload component in a Next.js application using the app router), I decided to go ahead with a redirect.
