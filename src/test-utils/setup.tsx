// Mock Plotly since it's not compatible with jsdom
jest.mock('react-plotly.js', () => ({
  __esModule: true,
  default: ({ data, layout }: any) => (
    <div data-testid="mock-plot" >
      <div data-testid="plot-data"> {JSON.stringify(data)} </div>
      < div data-testid="plot-layout" > {JSON.stringify(layout)} </div>
    </div>
  )
}));

// Mock environment variables
jest.mock('../utils/env', () => ({
  getEnvVar: (key: string) => {
    const envVars: { [key: string]: string } = {
      VITE_SERVER_URL: 'http://localhost:8000'
    };
    return envVars[key] || '';
  }
})); 