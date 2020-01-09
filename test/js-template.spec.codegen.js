import {
  getPetById,
  findPetsByTags,
  RequestValidationError,
  loginUser,
  updatePet,
} from './fixtures/petstore.yaml';

const mockPet = {
  id: 3,
  name: 'doggie',
  photoUrls: ['http://localhost/photo.png'],
};

describe('js-template', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should send a request with correct params', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockPet));

    await getPetById({ params: { petId: 3 } });

    expect(fetch).toBeCalledWith('https://petstore.swagger.io/v2/pet/3', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  });

  it('should throw on incorrect params if it was compiled with validateRequest flag', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockPet));

    try {
      await getPetById({ params: { petId: 3, id: 'test' } });
    } catch (error) {
      expect(error).toBeInstanceOf(RequestValidationError);
      expect(error).toHaveProperty('message', 'Request params schema validation error');
      expect(error).toHaveProperty('element', 'params');
      expect(error).toHaveProperty('method', 'getPetById');
    }

    try {
      await getPetById({ params: { petId: 'test' } });
    } catch (error) {
      expect(error).toBeInstanceOf(RequestValidationError);
      expect(error).toHaveProperty('message', 'Request params schema validation error');
      expect(error).toHaveProperty('element', 'params');
      expect(error).toHaveProperty('method', 'getPetById');
    }

    try {
      await getPetById({ params: { id: 3 } });
    } catch (error) {
      expect(error).toBeInstanceOf(RequestValidationError);
      expect(error).toHaveProperty('message', 'Request params schema validation error');
      expect(error).toHaveProperty('element', 'params');
      expect(error).toHaveProperty('method', 'getPetById');
    }

    expect(fetch).not.toBeCalled();
  });

  it('should send a request with correct query string', async () => {
    fetch.mockResponseOnce(JSON.stringify([mockPet]));

    await findPetsByTags({ query: { tags: ['tag1', 'tag2'] } });

    expect(fetch).toBeCalledWith(
      'https://petstore.swagger.io/v2/pet/findByTags?tags[]=tag1&tags[]=tag2',
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      }
    );
  });

  it('should throw on incorrect query string if it was compiled with validateRequest flag', async () => {
    fetch.mockResponseOnce(JSON.stringify('loggedin'));

    try {
      await loginUser({
        query: { password: 'password', username: 'username', prop: 'some value' },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RequestValidationError);
      expect(error).toHaveProperty('message', 'Request query string schema validation error');
      expect(error).toHaveProperty('element', 'query');
      expect(error).toHaveProperty('method', 'loginUser');
    }

    try {
      await loginUser({
        query: { password: 'password' },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RequestValidationError);
      expect(error).toHaveProperty('message', 'Request query string schema validation error');
      expect(error).toHaveProperty('element', 'query');
      expect(error).toHaveProperty('method', 'loginUser');
    }

    try {
      await loginUser({
        query: { password: true, username: 'username' },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RequestValidationError);
      expect(error).toHaveProperty('message', 'Request query string schema validation error');
      expect(error).toHaveProperty('element', 'query');
      expect(error).toHaveProperty('method', 'loginUser');
    }

    expect(fetch).not.toBeCalled();
  });

  it('should send a request with correct body', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockPet));

    await updatePet({ data: mockPet });

    expect(fetch).toBeCalledWith('https://petstore.swagger.io/v2/pet', {
      body: JSON.stringify(mockPet),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    });
  });

  it('should throw on incorrect body if it was compiled with validateRequest flag', async () => {});

  it('should send files without errors', async () => {});

  it('should throw on incorrect FormData body', async () => {});

  it('should send a request with correct headers', async () => {});

  it('should throw on incorrect headers if it was compiled with validateRequest flag', async () => {});

  it('should send a request with correct http method', async () => {});

  it('should send a request with to the url specified in docs', async () => {});

  it('should send a request with to the url specified the environment', async () => {});

  it('should execute pre middleware before the request if it is set', async () => {});

  it('should return the result specified in the docs', async () => {});

  it('should throw on incorrect result if it was compiled with validateResponse flag', async () => {});

  it('should choose application/json request content type, if there are more than one given', async () => {});

  it('should throw on unsupported request content-types', async () => {});

  it('should throw on unsupported response content-types', async () => {});

  it('should throw with an ApiError if response status is not ok', async () => {});

  it('should throw with an ClientError if something goes wrong during code execution', async () => {});
});
