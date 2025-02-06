import { fetchMetadata } from '../client';

describe('API Client', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('fetches metadata successfully', async () => {
    const mockData = { version: '1.0.0' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const result = await fetchMetadata();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/metadata');
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    await expect(fetchMetadata()).rejects.toThrow('Network response was not ok');
  });
}); 